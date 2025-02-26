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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const safe_error_helper_1 = require("../helper/safe-error.helper");
const transaction_helper_1 = require("../helper/transaction.helper");
const permission_entity_1 = require("../permission/entities/permission.entity");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
let RoleService = class RoleService {
    constructor(roleRepository, permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
    async create(createRoleDto) {
        const [roleExists] = await (0, safe_error_helper_1.safeError)(this.roleRepository.exists({ where: { name: createRoleDto.name } }));
        if (roleExists) {
            throw new common_1.ConflictException(`Role ${createRoleDto.name} already exists`);
        }
        const newRole = new role_entity_1.Role();
        if (createRoleDto.permissions) {
            const [assignedPermissions, err] = await (0, safe_error_helper_1.safeError)(this.permissionRepository.find({
                where: { name: (0, typeorm_2.In)(createRoleDto.permissions) },
            }));
            if (assignedPermissions.length === 0 ||
                assignedPermissions.length !== createRoleDto.permissions.length) {
                throw new common_1.BadRequestException('Invalid permissions');
            }
            if (err) {
                throw new common_1.InternalServerErrorException('Error while fetching permissions');
            }
            newRole.permissions = assignedPermissions;
        }
        newRole.name = createRoleDto.name;
        return (0, transaction_helper_1.runInTransaction)(async (queryRunner) => queryRunner.manager.save(role_entity_1.Role, newRole));
    }
    async findAll() {
        const [roles, error] = await (0, safe_error_helper_1.safeError)(this.roleRepository.find());
        if (roles.length === 0) {
            throw new common_1.NotFoundException('No roles found');
        }
        if (error) {
            throw new common_1.InternalServerErrorException('Error while fetching roles');
        }
        return roles;
    }
    async findOne(id) {
        const [res, error] = await (0, safe_error_helper_1.safeError)(this.roleRepository.findOneByOrFail({ id }));
        if (!res) {
            throw new common_1.NotFoundException('Role not found');
        }
        if (error) {
            throw new common_1.InternalServerErrorException('Error while fetching role');
        }
        return res;
    }
    async update(id, updateRoleDto) {
        const role = await this.findOne(id);
        if (updateRoleDto.name !== role.name) {
            const existingRole = await this.roleRepository.findOne({
                where: { name: updateRoleDto.name },
            });
            if (existingRole) {
                throw new common_1.ConflictException(`Role ${updateRoleDto.name} already exists`);
            }
            role.name = updateRoleDto.name;
        }
        if (updateRoleDto.permissions) {
            const [assignedPermissions, err] = await (0, safe_error_helper_1.safeError)(this.permissionRepository.find({
                where: { name: (0, typeorm_2.In)(updateRoleDto.permissions) },
            }));
            if (assignedPermissions.length === 0 ||
                assignedPermissions.length !== updateRoleDto.permissions.length) {
                throw new common_1.BadRequestException('Invalid permissions');
            }
            if (err) {
                throw new common_1.InternalServerErrorException('Error while fetching permissions');
            }
            role.permissions = assignedPermissions;
        }
        return (0, transaction_helper_1.runInTransaction)(async (queryRunner) => queryRunner.manager.save(role_entity_1.Role, role));
    }
    async remove(id) {
        const role = await this.findOne(id);
        (0, transaction_helper_1.runInTransaction)(async (queryRunner) => queryRunner.manager.softRemove(role_entity_1.Role, role));
        return `${role.name} Role deleted successfully`;
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map