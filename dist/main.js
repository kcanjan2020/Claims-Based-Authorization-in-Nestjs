"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const data_source_1 = require("./database/data-source");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.enableCors({
        origin: '*',
        allowedHeaders: '*',
        methods: '*',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await data_source_1.AppDataSource.initialize()
        .then(() => {
        logger.log('Data Source has been initialized!');
    })
        .catch((err) => {
        logger.error('Error during Data Source initialization:', err);
    });
    const configService = app.get(config_1.ConfigService);
    const env = configService.get('APP_ENV') || 'development';
    if (env.toUpperCase() !== 'PRODUCTION') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('')
            .setDescription('The Claims BasedAuthorization in Nestjs')
            .setVersion('1.0')
            .addTag('Claims Based Authorization')
            .addBearerAuth()
            .build();
        const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('swagger', app, documentFactory, {
            customSiteTitle: 'The Claims BasedAuthorization in Nestjs',
        });
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map