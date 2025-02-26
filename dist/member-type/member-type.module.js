"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberTypeModule = void 0;
const common_1 = require("@nestjs/common");
const member_type_service_1 = require("./member-type.service");
const member_type_controller_1 = require("./member-type.controller");
const typeorm_1 = require("@nestjs/typeorm");
const member_type_entity_1 = require("./entities/member-type.entity");
let MemberTypeModule = class MemberTypeModule {
};
exports.MemberTypeModule = MemberTypeModule;
exports.MemberTypeModule = MemberTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([member_type_entity_1.MemberType])],
        controllers: [member_type_controller_1.MemberTypeController],
        providers: [member_type_service_1.MemberTypeService],
    })
], MemberTypeModule);
//# sourceMappingURL=member-type.module.js.map