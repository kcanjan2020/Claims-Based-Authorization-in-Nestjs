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
exports.MemberTypeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const member_type_service_1 = require("./member-type.service");
const create_member_type_dto_1 = require("./dto/create-member-type.dto");
const update_member_type_dto_1 = require("./dto/update-member-type.dto");
const auth_decorator_1 = require("../iam/auth/decorator/auth.decorator");
const auth_type_enum_1 = require("../iam/auth/enums/auth-type.enum");
let MemberTypeController = class MemberTypeController {
    constructor(memberTypeService) {
        this.memberTypeService = memberTypeService;
    }
    create(createMemberTypeDto) {
        return this.memberTypeService.create(createMemberTypeDto);
    }
    findAll() {
        return this.memberTypeService.findAll();
    }
    findOne(id) {
        return this.memberTypeService.findOne(+id);
    }
    update(id, updateMemberTypeDto) {
        return this.memberTypeService.update(+id, updateMemberTypeDto);
    }
    remove(id) {
        return this.memberTypeService.remove(+id);
    }
};
exports.MemberTypeController = MemberTypeController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/member-type.entity").MemberType }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_type_dto_1.CreateMemberTypeDto]),
    __metadata("design:returntype", void 0)
], MemberTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/member-type.entity").MemberType] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MemberTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/member-type.entity").MemberType }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MemberTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/member-type.entity").MemberType }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_member_type_dto_1.UpdateMemberTypeDto]),
    __metadata("design:returntype", void 0)
], MemberTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MemberTypeController.prototype, "remove", null);
exports.MemberTypeController = MemberTypeController = __decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.None),
    (0, common_1.Controller)('member-type'),
    __metadata("design:paramtypes", [member_type_service_1.MemberTypeService])
], MemberTypeController);
//# sourceMappingURL=member-type.controller.js.map