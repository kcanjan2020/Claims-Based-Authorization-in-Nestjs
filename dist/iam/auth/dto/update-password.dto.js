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
exports.UpdatePasswordResponseDto = exports.UpdatePasswordDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../decorator/match.decorator");
class UpdatePasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { oldPassword: { required: true, type: () => String, minLength: 8 }, newPassword: { required: true, type: () => String, minLength: 8 }, confirmNewPassword: { required: true, type: () => String } };
    }
}
exports.UpdatePasswordDto = UpdatePasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, match_decorator_1.Match)('newPassword', { message: 'Passwords do not match' }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "confirmNewPassword", void 0);
class UpdatePasswordResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, success: { required: true, type: () => Boolean } };
    }
}
exports.UpdatePasswordResponseDto = UpdatePasswordResponseDto;
//# sourceMappingURL=update-password.dto.js.map