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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const sign_up_dto_1 = require("./sign-up.dto");
const match_decorator_1 = require("../decorator/match.decorator");
class UserUpdateDto extends (0, swagger_1.PartialType)(sign_up_dto_1.SignUpDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: false, type: () => String }, lastName: { required: false, type: () => String }, phoneNumber: { required: false, type: () => String }, email: { required: false, type: () => String, format: "email" }, password: { required: false, type: () => String, minLength: 8 }, confirmPassword: { required: false, type: () => String }, profilePicture: { required: false, type: () => Object } };
    }
}
exports.UserUpdateDto = UserUpdateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, match_decorator_1.Match)('password', { message: 'Passwords do not match' }),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UserUpdateDto.prototype, "profilePicture", void 0);
//# sourceMappingURL=user-update.dto.js.map