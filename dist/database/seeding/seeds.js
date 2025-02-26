"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_extension_1 = require("typeorm-extension");
const data_source_1 = require("../data-source");
const seedingDataSourceoOptions = {
    ...data_source_1.dataSourceOptions,
    factories: ['dist/database/factory/**/*.factory.js'],
    seeds: ['dist/database/seeding/**/*.seeder.js'],
};
const dataSource = new typeorm_1.DataSource(seedingDataSourceoOptions);
dataSource.initialize().then(async () => {
    await (0, typeorm_extension_1.runSeeders)(dataSource);
    console.log('Seeding completed......');
    process.exit();
});
exports.default = dataSource;
//# sourceMappingURL=seeds.js.map