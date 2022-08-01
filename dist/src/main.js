"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const secret_1 = require("../config/secret");
const swagger_1 = require("@nestjs/swagger");
const expressBasicAuth = require("express-basic-auth");
const logger_interceptor_1 = require("../common/logger/logger.interceptor");
async function bootstrap() {
    console.log(process.env.DB_USER);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new logger_interceptor_1.HTTPLoggingInterceptor());
    app.use(['/docs', '/docs-json'], expressBasicAuth({
        challenge: true,
        users: {
            cookie: secret_1.secret.swagger_password,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nestjs 템플릿')
        .setDescription('템플릿 스웨거입니다.')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map