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
exports.StorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let StorageService = class StorageService {
    constructor(configService) {
        this.configService = configService;
        const accessKeyId = this.configService.get('STORAGE_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('STORAGE_SECRET_ACCESS_KEY');
        const accountId = this.configService.get('STORAGE_ACCOUNT_ID');
        this.Bucket = this.configService.get('STORAGE_BUCKET');
        this.s3Client = new client_s3_1.S3Client({
            region: 'auto',
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
            requestChecksumCalculation: 'WHEN_REQUIRED',
            responseChecksumValidation: 'WHEN_REQUIRED',
        });
    }
    async save(directory, file, name) {
        const nameto = (0, uuid_1.v4)() + '_' + file.originalname.replace(/\s/g, '');
        const upload = new lib_storage_1.Upload({
            client: this.s3Client,
            params: {
                Bucket: this.Bucket,
                Key: directory + '/' + (name ? name : nameto),
                Body: file.buffer,
                ACL: 'public-read',
            },
            queueSize: 1,
            leavePartsOnError: true,
            partSize: 5 * 1024 * 1024,
        });
        try {
            await upload.done();
            return directory + '/' + (name ? name : nameto);
        }
        catch (err) {
            throw err;
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map