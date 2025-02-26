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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const active_user_decorator_1 = require("./decorator/active-user.decorator");
const auth_decorator_1 = require("./decorator/auth.decorator");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
const user_update_dto_1 = require("./dto/user-update.dto");
const auth_type_enum_1 = require("./enums/auth-type.enum");
const platform_express_1 = require("@nestjs/platform-express");
const baseQuery_dto_1 = require("../../dto/baseQuery.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signup(signUpDto, profilePicture) {
        return this.authService.signup(signUpDto, profilePicture);
    }
    signin(signInDto) {
        return this.authService.signin(signInDto);
    }
    refreshToken(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
    me(loggedInUser) {
        return this.authService.getMe(loggedInUser);
    }
    forgetPassword(loggedInUser, updatePasswordDto) {
        return this.authService.updatePassword(loggedInUser, updatePasswordDto);
    }
    update(userUpdateDto, userId, profilePicture) {
        return this.authService.update(userUpdateDto, +userId, profilePicture);
    }
    async getAllUser(queries) {
        return this.authService.getAllUser(queries);
    }
    findOne(id) {
        return this.authService.findOne(+id);
    }
    async remove(id) {
        await this.authService.remove(+id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture')),
    (0, common_1.Post)('signup'),
    openapi.ApiResponse({ status: 201, type: require("../../user/entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    openapi.ApiResponse({ status: 201, type: require("./dto/refresh-token.dto").TokenResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.Bearer),
    (0, common_1.Post)('refresh-token'),
    openapi.ApiResponse({ status: 201, type: require("./dto/refresh-token.dto").TokenResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.Bearer),
    (0, common_1.Get)('me'),
    openapi.ApiResponse({ status: 200, type: require("../../user/entities/user.entity").User }),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.Bearer),
    (0, common_1.Post)('updatepassword'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/update-password.dto").UpdatePasswordResponseDto }),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture')),
    (0, common_1.Patch)('user/:userId'),
    openapi.ApiResponse({ status: 200, type: require("../../user/entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_dto_1.UserUpdateDto, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('users'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [baseQuery_dto_1.BaseQuery]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    openapi.ApiResponse({ status: 200, type: require("../../user/entities/user.entity").User }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('user/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "remove", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.None),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map