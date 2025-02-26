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
exports.SignUpDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../decorator/match.decorator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class SignUpDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String, minLength: 2, maxLength: 20 }, lastName: { required: true, type: () => String, minLength: 2, maxLength: 20 }, phoneNumber: { required: true, type: () => String, pattern: "/^\\+977-9\\d{9}$/" }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8 }, confirmPassword: { required: true, type: () => String }, profilePicture: { required: false, type: () => Object }, roles: { required: false, type: () => [String] } };
    }
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 20, { message: 'First name must be between 2 and 20 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 20, { message: 'Last name must be between 2 and 20 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^\+977-9\d{9}$/, {
        message: 'Invalid Nepali phone number format. Use +977-9XXXXXXXXX',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, match_decorator_1.Match)('password', { message: 'Passwords do not match' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SignUpDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Roles must be an array of strings' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Each role must be a string' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                return value.split(',').map((role) => role.trim());
            }
        }
        return value;
    }),
    __metadata("design:type", Array)
], SignUpDto.prototype, "roles", void 0);
//# sourceMappingURL=sign-up.dto.js.map