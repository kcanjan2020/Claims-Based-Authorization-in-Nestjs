"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.dataSourceOptions = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
};
exports.AppDataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=data-source.js.map