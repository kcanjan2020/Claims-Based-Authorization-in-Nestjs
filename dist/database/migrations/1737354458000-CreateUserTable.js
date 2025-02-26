"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1737354458000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1737354458000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: [
                        'superAdmin',
                        'companyAdmin',
                        'employee',
                        'guest',
                        'manager',
                    ],
                    default: `'guest'`,
                },
                {
                    name: 'createdAt',
                    type: 'timestamptz',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamptz',
                    default: 'now()',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamptz',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createIndex('user', new typeorm_1.TableIndex({
            name: 'IDX_USER_EMAIL',
            columnNames: ['email'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.CreateUserTable1737354458000 = CreateUserTable1737354458000;
//# sourceMappingURL=1737354458000-CreateUserTable.js.map