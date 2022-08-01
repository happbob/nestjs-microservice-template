"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./Web/auth/auth.module");
const user_module_1 = require("./Admin/user/user.module");
const auth_module_2 = require("./Admin/auth/auth.module");
const config_1 = require("@nestjs/config");
const api_call_history_entity_1 = require("./entity/api-call-history.entity");
let AppModule = class AppModule {
    configure(consumer) { }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : 'env.test',
                ignoreEnvFile: process.env.NODE_ENV === 'prod',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'kooki7869^^',
                database: 'test',
                entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
                synchronize: true,
                bigNumberStrings: false,
                charset: 'utf8mb4',
            }),
            typeorm_1.TypeOrmModule.forFeature([api_call_history_entity_1.ApiCallHistory]),
            auth_module_1.AuthModule,
            user_module_1.AdminUserModule,
            auth_module_2.AdminAuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map