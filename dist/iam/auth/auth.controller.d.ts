import { ActiveUserData } from '../interface/active-user-data.interface';
import { AuthService } from './auth.service';
import { RefreshTokenDto, TokenResponseDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdatePasswordResponseDto, UpdatePasswordDto } from './dto/update-password.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { BaseQuery } from 'src/dto/baseQuery.dto';
import { PaginatedDto } from 'src/dto/pageReturn';
import { User } from 'src/user/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signUpDto: SignUpDto, profilePicture: Express.Multer.File): Promise<User>;
    signin(signInDto: SignInDto): Promise<TokenResponseDto>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenResponseDto>;
    me(loggedInUser: ActiveUserData): Promise<User>;
    forgetPassword(loggedInUser: ActiveUserData, updatePasswordDto: UpdatePasswordDto): Promise<UpdatePasswordResponseDto>;
    update(userUpdateDto: UserUpdateDto, userId: string, profilePicture: Express.Multer.File): Promise<User>;
    getAllUser(queries: BaseQuery): Promise<PaginatedDto<User>>;
    findOne(id: string): Promise<User>;
    remove(id: string): Promise<void>;
}
