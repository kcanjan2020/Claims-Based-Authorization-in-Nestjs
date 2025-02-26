import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';
import { PostgresErrorCode } from 'src/database/postgresErrorCode.enum';
import { safeError } from 'src/helper/safe-error.helper';
import { StorageService } from 'src/helper/storage.service';
import { In, Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from '../interface/active-user-data.interface';
import { RefreshTokenDto, TokenResponseDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {
  UpdatePasswordDto,
  UpdatePasswordResponseDto,
} from './dto/update-password.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { BaseQuery } from 'src/dto/baseQuery.dto';
import { PaginatedDto } from 'src/dto/pageReturn';
import { pageFilterHelper } from 'src/helper/page-helper';
import { sortHelper } from 'src/helper/sort-helper';
import { searchFilterHelper } from 'src/helper/search-helper';
import { getDeletedClause } from 'src/helper/get-deleted-clause';
import { runInTransaction } from 'src/helper/transaction.helper';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly storageService: StorageService,

    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  private async generateTokens(user: User) {
    const token = randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
          roles: user.roles.map((role) => role.name),
          tokenType: 'access',
        },
      ),
      this.signToken<{
        refreshTokenId: string;
      }>(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId: token,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken<T extends Record<string, any>>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        expiresIn: expiresIn,
      },
    );
  }

  async signup(
    signUpDto: SignUpDto,
    profilePicture: Express.Multer.File,
  ): Promise<User> {
    const _user = new User();
    if (signUpDto.roles) {
      const [assignedRoles, err] = await safeError(
        this.roleRepository.find({
          where: { name: In(signUpDto.roles) },
        }),
      );
      if (assignedRoles.length === 0) {
        throw new BadRequestException('Invalid role');
      }
      if (err) {
        throw new InternalServerErrorException('Error while fetching roles');
      }
      _user.roles = assignedRoles;
    }
    if (profilePicture) {
      const [fileName, err] = await safeError(
        this.storageService.save('profile-picture', profilePicture),
      );
      if (err)
        throw new InternalServerErrorException(
          'Failed to save profile picture',
        );
      _user.profilePicture = fileName;
    }

    try {
      _user.firstName = signUpDto.firstName;
      _user.lastName = signUpDto.lastName;
      _user.phoneNumber = signUpDto.phoneNumber;
      _user.email = signUpDto.email;
      _user.password = await this.hashingService.hash(signUpDto.password);

      const newUser = await this.userRepository.save(_user);
      return plainToClass(User, newUser);
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with this email already exists');
      }
      throw new InternalServerErrorException('Error while Signing up');
    }
  }

  async signin(signInDto: SignInDto): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOne({
      relations: ['roles'],
      where: { email: signInDto.email },
      select: ['id', 'email', 'password', 'roles'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordMatched = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Password not matched');
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
      Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
    >(refreshTokenDto.refreshToken, {
      secret: this.jwtConfiguration.secret,
      issuer: this.jwtConfiguration.issuer,
      audience: this.jwtConfiguration.audience,
    });

    if (!refreshTokenId) {
      throw new BadRequestException('Invalid token');
    }

    const user = await this.userRepository.findOne({
      where: { id: sub },
      select: ['id', 'email', 'roles'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.generateTokens(user);
  }

  async getMe(loggedIn: ActiveUserData): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: loggedIn.sub },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error while getting user data');
    }
  }
  async updatePassword(
    loggedInUser: ActiveUserData,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdatePasswordResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: loggedInUser.sub },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatched = await this.hashingService.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Old password not matched');
    }

    try {
      user.password = await this.hashingService.hash(
        updatePasswordDto.newPassword,
      );
      await this.userRepository.save(user);

      return {
        message: 'Password updated successfully!',
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error while updating password');
    }
  }

  async update(
    userUpdateDto: UserUpdateDto,
    userId: number,
    profilePicture: Express.Multer.File,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'password', 'roles'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (userUpdateDto.roles) {
      const [assignedRoles, err] = await safeError(
        this.roleRepository.find({
          where: { name: In(userUpdateDto.roles) },
        }),
      );

      if (assignedRoles.length === 0) {
        throw new BadRequestException('Invalid role');
      }
      if (err) {
        throw new InternalServerErrorException('Error while fetching roles');
      }
      user.roles = assignedRoles;
    }

    try {
      userUpdateDto.firstName
        ? (user.firstName = userUpdateDto.firstName)
        : user.firstName;

      userUpdateDto.lastName
        ? (user.lastName = userUpdateDto.lastName)
        : user.lastName;

      userUpdateDto.phoneNumber
        ? (user.phoneNumber = userUpdateDto.phoneNumber)
        : user.phoneNumber;

      userUpdateDto.email ? (user.email = userUpdateDto.email) : user.email;
      if (userUpdateDto.password) {
        user.password = await this.hashingService.hash(userUpdateDto.password);
      }

      const updatedUser = await this.userRepository.save(user);
      return plainToClass(User, updatedUser);
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation)
        throw new ConflictException('Email already exists');
      throw new InternalServerErrorException('Error while updating user data');
    }
  }

  async getAllUser(queries: BaseQuery): Promise<PaginatedDto<User>> {
    const pageFilters = pageFilterHelper(queries);
    const order = sortHelper(queries, [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'updatedAt',
    ]);

    const search = searchFilterHelper(queries, [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
    ]);

    const [offsetDataWithCount, err] = await safeError(
      this.userRepository.findAndCount({
        where: {
          ...search,
          deletedAt: getDeletedClause(queries.deleted),
        },
        withDeleted: true,
        ...pageFilters,
        order,
        relations: ['roles', 'roles.permissions'],
      }),
    );
    if (err) {
      throw new InternalServerErrorException('Field to fetch user');
    }

    return new PaginatedDto(offsetDataWithCount, pageFilters);
  }

  async findOne(id: number): Promise<User> {
    const [user, err] = await safeError(
      this.userRepository.findOne({
        relations: ['roles', 'roles.permissions'],
        where: { id: id },
      }),
    );

    if (err) {
      throw new InternalServerErrorException('Failed to fetch user');
    }
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  async remove(id: number) {
    const user = this.findOne(id);
    return runInTransaction(async (queryRunner) =>
      queryRunner.manager.softDelete(User, id),
    );
  }

  async getUserPermission(userId: number) {}
}
