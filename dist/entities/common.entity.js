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
exports.CommonEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
class CommonEntity extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date, nullable: true } };
    }
}
exports.CommonEntity = CommonEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommonEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', select: false }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', nullable: true, select: false }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "deletedAt", void 0);
//# sourceMappingURL=common.entity.js.map