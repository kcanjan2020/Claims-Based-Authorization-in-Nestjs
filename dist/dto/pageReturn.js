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
exports.PaginatedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginatedDto {
    constructor(offsetDataWithCount, pageData) {
        const [data, total] = offsetDataWithCount;
        const { size, page } = pageData;
        const isFirst = page == 1;
        const totalPages = Math.ceil(total / size);
        const isLast = totalPages == page;
        this.currentPage = page;
        this.data = data;
        this.total = total;
        this.isFirst = isFirst;
        this.isLast = isLast;
        this.size = size;
        this.totalPages = totalPages;
    }
}
exports.PaginatedDto = PaginatedDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PaginatedDto.prototype, "isLast", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PaginatedDto.prototype, "isFirst", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedDto.prototype, "size", void 0);
//# sourceMappingURL=pageReturn.js.map