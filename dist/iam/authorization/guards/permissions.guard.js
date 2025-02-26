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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const iam_constants_1 = require("../../iam.constants");
const permission_decorator_1 = require("../decorators/permission.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../../../role/entities/role.entity");
const typeorm_2 = require("typeorm");
let PermissionGuard = class PermissionGuard {
    constructor(reflector, roleRepository) {
        this.reflector = reflector;
        this.roleRepository = roleRepository;
    }
    async canActivate(context) {
        const requiredPermission = this.reflector.getAllAndOverride(permission_decorator_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermission) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request[iam_constants_1.REQUEST_USER_KEY];
        const userRoles = user?.roles ?? [];
        if (userRoles.length === 0) {
            return false;
        }
        const roles = await this.roleRepository.find({
            where: { name: (0, typeorm_2.In)(userRoles) },
            relations: ['permissions'],
        });
        const userPermissions = [
            ...new Set(roles.flatMap((role) => role.permissions.map((permission) => permission.name))),
        ];
        return requiredPermission.every((permission) => userPermissions.includes(permission));
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], PermissionGuard);
//# sourceMappingURL=permissions.guard.js.map