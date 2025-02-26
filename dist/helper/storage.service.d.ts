import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly configService;
    private readonly Bucket;
    private readonly s3Client;
    constructor(configService: ConfigService);
    save(directory: string, file: Express.Multer.File, name?: string): Promise<string>;
}
