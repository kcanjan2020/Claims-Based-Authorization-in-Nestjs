"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_extension_1 = require("typeorm-extension");
const seeds_1 = require("../seeding/seeds");
const role_entity_1 = require("../../role/entities/role.entity");
const bcryptjs_1 = require("bcryptjs");
exports.UserFactory = (0, typeorm_extension_1.setSeederFactory)(user_entity_1.User, async (faker) => {
    const user = new user_entity_1.User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.phoneNumber = faker.phone.number();
    user.email = faker.internet.email();
    user.password = await (0, bcryptjs_1.hash)(faker.internet.password(), await (0, bcryptjs_1.genSalt)());
    const roleRepository = seeds_1.default.getRepository(role_entity_1.Role);
    const roles = await roleRepository.find();
    const getRandomRole = () => roles[Math.floor(Math.random() * roles.length)];
    user.roles = [getRandomRole()];
    return user;
});
//# sourceMappingURL=user.factory.js.map