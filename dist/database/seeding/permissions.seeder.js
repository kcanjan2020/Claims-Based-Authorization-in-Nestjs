"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionSeeder = void 0;
const common_1 = require("@nestjs/common");
const user_permission_1 = require("../../iam/authorization/enum/user.permission");
const permission_entity_1 = require("../../permission/entities/permission.entity");
let PermissionSeeder = class PermissionSeeder {
    async run(dataSource) {
        const permissionRepository = dataSource.getRepository(permission_entity_1.Permission);
        await dataSource.query(`TRUNCATE TABLE "permission" RESTART IDENTITY CASCADE`);
        const permissions = Object.values(user_permission_1.UserPermissions).map((permission) => ({
            name: permission,
        }));
        await permissionRepository.save(permissions);
        console.log('Seeding Permissions......');
    }
};
exports.PermissionSeeder = PermissionSeeder;
exports.PermissionSeeder = PermissionSeeder = __decorate([
    (0, common_1.Injectable)()
], PermissionSeeder);
//# sourceMappingURL=permissions.seeder.js.map