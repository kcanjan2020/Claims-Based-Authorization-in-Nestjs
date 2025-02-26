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
exports.MemberType = void 0;
const openapi = require("@nestjs/swagger");
const common_entity_1 = require("../../entities/common.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let MemberType = class MemberType extends common_entity_1.CommonEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { memberType: { required: true, type: () => String }, users: { required: true, type: () => require("../../user/entities/user.entity").User } };
    }
};
exports.MemberType = MemberType;
__decorate([
    (0, typeorm_1.Column)({ name: 'member_type', type: 'varchar', unique: true }),
    __metadata("design:type", String)
], MemberType.prototype, "memberType", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.memberTypes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({
        name: 'user_member_type',
        joinColumn: { name: 'member_type_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", user_entity_1.User)
], MemberType.prototype, "users", void 0);
exports.MemberType = MemberType = __decorate([
    (0, typeorm_1.Entity)()
], MemberType);
//# sourceMappingURL=member-type.entity.js.map