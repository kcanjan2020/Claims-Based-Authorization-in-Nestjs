"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const crypto_1 = require("crypto");
const postgresErrorCode_enum_1 = require("../../database/postgresErrorCode.enum");
const safe_error_helper_1 = require("../../helper/safe-error.helper");
const storage_service_1 = require("../../helper/storage.service");
const typeorm_2 = require("typeorm");
const jwt_config_1 = require("../config/jwt.config");
const hashing_service_1 = require("../hashing/hashing.service");
const pageReturn_1 = require("../../dto/pageReturn");
const page_helper_1 = require("../../helper/page-helper");
const sort_helper_1 = require("../../helper/sort-helper");
const search_helper_1 = require("../../helper/search-helper");
const get_deleted_clause_1 = require("../../helper/get-deleted-clause");
const transaction_helper_1 = require("../../helper/transaction.helper");
const user_entity_1 = require("../../user/entities/user.entity");
const role_entity_1 = require("../../role/entities/role.entity");
let AuthService = class AuthService {
    constructor(userRepository, hashingService, jwtService, jwtConfiguration, storageService, roleRepository) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
        this.storageService = storageService;
        this.roleRepository = roleRepository;
    }
    async generateTokens(user) {
        const token = (0, crypto_1.randomUUID)();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, {
                email: user.email,
                roles: user.roles.map((role) => role.name),
                tokenType: 'access',
            }),
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
                refreshTokenId: token,
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async signToken(userId, expiresIn, payload) {
        return this.jwtService.signAsync({
            sub: userId,
            ...payload,
        }, {
            secret: this.jwtConfiguration.secret,
            issuer: this.jwtConfiguration.issuer,
            audience: this.jwtConfiguration.audience,
            expiresIn: expiresIn,
        });
    }
    async signup(signUpDto, profilePicture) {
        const _user = new user_entity_1.User();
        if (signUpDto.roles) {
            const [assignedRoles, err] = await (0, safe_error_helper_1.safeError)(this.roleRepository.find({
                where: { name: (0, typeorm_2.In)(signUpDto.roles) },
            }));
            if (assignedRoles.length === 0) {
                throw new common_1.BadRequestException('Invalid role');
            }
            if (err) {
                throw new common_1.InternalServerErrorException('Error while fetching roles');
            }
            _user.roles = assignedRoles;
        }
        if (profilePicture) {
            const [fileName, err] = await (0, safe_error_helper_1.safeError)(this.storageService.save('profile-picture', profilePicture));
            if (err)
                throw new common_1.InternalServerErrorException('Failed to save profile picture');
            _user.profilePicture = fileName;
        }
        try {
            _user.firstName = signUpDto.firstName;
            _user.lastName = signUpDto.lastName;
            _user.phoneNumber = signUpDto.phoneNumber;
            _user.email = signUpDto.email;
            _user.password = await this.hashingService.hash(signUpDto.password);
            const newUser = await this.userRepository.save(_user);
            return (0, class_transformer_1.plainToClass)(user_entity_1.User, newUser);
        }
        catch (error) {
            if (error.code === postgresErrorCode_enum_1.PostgresErrorCode.UniqueViolation) {
                throw new common_1.BadRequestException('User with this email already exists');
            }
            throw new common_1.InternalServerErrorException('Error while Signing up');
        }
    }
    async signin(signInDto) {
        const user = await this.userRepository.findOne({
            relations: ['roles'],
            where: { email: signInDto.email },
            select: ['id', 'email', 'password', 'roles'],
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isPasswordMatched = await this.hashingService.compare(signInDto.password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.BadRequestException('Password not matched');
        }
        return this.generateTokens(user);
    }
    async refreshToken(refreshTokenDto) {
        const { sub, refreshTokenId } = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
            secret: this.jwtConfiguration.secret,
            issuer: this.jwtConfiguration.issuer,
            audience: this.jwtConfiguration.audience,
        });
        if (!refreshTokenId) {
            throw new common_1.BadRequestException('Invalid token');
        }
        const user = await this.userRepository.findOne({
            where: { id: sub },
            select: ['id', 'email', 'roles'],
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return this.generateTokens(user);
    }
    async getMe(loggedIn) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: loggedIn.sub },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while getting user data');
        }
    }
    async updatePassword(loggedInUser, updatePasswordDto) {
        const user = await this.userRepository.findOne({
            where: { id: loggedInUser.sub },
            select: ['id', 'email', 'password'],
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isPasswordMatched = await this.hashingService.compare(updatePasswordDto.oldPassword, user.password);
        if (!isPasswordMatched) {
            throw new common_1.BadRequestException('Old password not matched');
        }
        try {
            user.password = await this.hashingService.hash(updatePasswordDto.newPassword);
            await this.userRepository.save(user);
            return {
                message: 'Password updated successfully!',
                success: true,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while updating password');
        }
    }
    async update(userUpdateDto, userId, profilePicture) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'email', 'password', 'roles'],
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (userUpdateDto.roles) {
            const [assignedRoles, err] = await (0, safe_error_helper_1.safeError)(this.roleRepository.find({
                where: { name: (0, typeorm_2.In)(userUpdateDto.roles) },
            }));
            if (assignedRoles.length === 0) {
                throw new common_1.BadRequestException('Invalid role');
            }
            if (err) {
                throw new common_1.InternalServerErrorException('Error while fetching roles');
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
            return (0, class_transformer_1.plainToClass)(user_entity_1.User, updatedUser);
        }
        catch (error) {
            if (error.code === postgresErrorCode_enum_1.PostgresErrorCode.UniqueViolation)
                throw new common_1.ConflictException('Email already exists');
            throw new common_1.InternalServerErrorException('Error while updating user data');
        }
    }
    async getAllUser(queries) {
        const pageFilters = (0, page_helper_1.pageFilterHelper)(queries);
        const order = (0, sort_helper_1.sortHelper)(queries, [
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'updatedAt',
        ]);
        const search = (0, search_helper_1.searchFilterHelper)(queries, [
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
        ]);
        const [offsetDataWithCount, err] = await (0, safe_error_helper_1.safeError)(this.userRepository.findAndCount({
            where: {
                ...search,
                deletedAt: (0, get_deleted_clause_1.getDeletedClause)(queries.deleted),
            },
            withDeleted: true,
            ...pageFilters,
            order,
            relations: ['roles', 'roles.permissions'],
        }));
        if (err) {
            throw new common_1.InternalServerErrorException('Field to fetch user');
        }
        return new pageReturn_1.PaginatedDto(offsetDataWithCount, pageFilters);
    }
    async findOne(id) {
        const [user, err] = await (0, safe_error_helper_1.safeError)(this.userRepository.findOne({
            relations: ['roles', 'roles.permissions'],
            where: { id: id },
        }));
        if (err) {
            throw new common_1.InternalServerErrorException('Failed to fetch user');
        }
        if (!user) {
            throw new common_1.NotFoundException('User not Found');
        }
        return user;
    }
    async remove(id) {
        const user = this.findOne(id);
        return (0, transaction_helper_1.runInTransaction)(async (queryRunner) => queryRunner.manager.softDelete(user_entity_1.User, id));
    }
    async getUserPermission(userId) { }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __param(5, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_service_1.HashingService,
        jwt_1.JwtService, void 0, storage_service_1.StorageService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map