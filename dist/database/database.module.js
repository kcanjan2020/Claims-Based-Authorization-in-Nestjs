"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const iam_module_1 = require("../iam/iam.module");
const hashing_service_1 = require("../iam/hashing/hashing.service");
const bcrypt_service_1 = require("../iam/hashing/bcrypt.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const shouldLog = configService.get('LOG_TYPEORM') == 'true';
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME'),
                        autoLoadEntities: true,
                        synchronize: true,
                        logging: shouldLog,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            iam_module_1.IamModule,
        ],
        providers: [
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BcryptService,
            },
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map