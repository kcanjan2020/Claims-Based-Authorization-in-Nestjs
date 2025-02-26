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
exports.BaseQuery = exports.SortingOrder = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var SortingOrder;
(function (SortingOrder) {
    SortingOrder["ASC"] = "ASC";
    SortingOrder["DESC"] = "DESC";
})(SortingOrder || (exports.SortingOrder = SortingOrder = {}));
class BaseQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: false, type: () => Number }, size: { required: false, type: () => Number }, sortBy: { required: false, type: () => String }, orderBy: { required: false, enum: require("./baseQuery.dto").SortingOrder }, deleted: { required: false, type: () => Boolean }, searchIn: { required: false, type: () => String }, searchBy: { required: false, type: () => String } };
    }
}
exports.BaseQuery = BaseQuery;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((v) => Number(v.value)),
    __metadata("design:type", Number)
], BaseQuery.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((v) => Number(v.value)),
    __metadata("design:type", Number)
], BaseQuery.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortingOrder),
    __metadata("design:type", String)
], BaseQuery.prototype, "orderBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)((v) => {
        if (typeof v.obj.deleted === 'string') {
            if (v.obj.deleted === 'false') {
                return false;
            }
        }
        return Boolean(v.obj.deleted);
    }),
    __metadata("design:type", Boolean)
], BaseQuery.prototype, "deleted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseQuery.prototype, "searchIn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseQuery.prototype, "searchBy", void 0);
//# sourceMappingURL=baseQuery.dto.js.map