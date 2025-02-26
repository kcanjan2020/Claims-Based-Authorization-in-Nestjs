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
exports.CreateRoleDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateRoleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 15 }, permissions: { required: false, type: () => [String] } };
    }
}
exports.CreateRoleDto = CreateRoleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 15, { message: 'Role name must be between 3 and 15 characters' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Permission must be an array of strings' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Each Permission must be a string' }),
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
], CreateRoleDto.prototype, "permissions", void 0);
//# sourceMappingURL=create-role.dto.js.map