"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const role_entity_1 = require("../../role/entities/role.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let UserSeeder = class UserSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(user_entity_1.User);
        const roleRepository = dataSource.getRepository(role_entity_1.Role);
        await dataSource.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);
        const roles = await roleRepository.find();
        const getRandomRole = () => roles[Math.floor(Math.random() * roles.length)];
        await userRepository.save([
            {
                firstName: 'Admin',
                lastName: 'Admin',
                phoneNumber: '9866904450',
                email: 'admin@gmail.com',
                password: await (0, bcryptjs_1.hash)('password', await (0, bcryptjs_1.genSalt)()),
                roles: [getRandomRole()],
            },
            {
                firstName: 'Anjan ',
                lastName: 'KC',
                phoneNumber: '9866904450',
                email: 'kcanjan2020@gmail.com',
                password: await (0, bcryptjs_1.hash)('password', await (0, bcryptjs_1.genSalt)()),
                roles: [getRandomRole()],
            },
        ]);
        const userFactory = factoryManager.get(user_entity_1.User);
        console.log('Seeding User......');
    }
};
exports.UserSeeder = UserSeeder;
exports.UserSeeder = UserSeeder = __decorate([
    (0, common_1.Injectable)()
], UserSeeder);
//# sourceMappingURL=user.seeder.js.map