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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const secret_1 = require("../../../../config/secret");
const passport_jwt_1 = require("passport-jwt");
const typeorm_1 = require("typeorm");
const user_info_entity_1 = require("../../../entity/user-info.entity");
const typeorm_2 = require("@nestjs/typeorm");
const response_utils_1 = require("../../../../config/response.utils");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(adminRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('x-access-token'),
            secretOrKey: secret_1.secret.web_jwt_secret_key,
            ignoreExpiration: false,
        });
        this.adminRepository = adminRepository;
    }
    async validate(payload) {
        const user = await this.adminRepository.findOne({
            where: { id: payload.id, status: 'ACTIVE' },
        });
        if (user == undefined) {
            throw new common_1.HttpException(response_utils_1.RESPONSE.NON_EXIST_USER, 201);
        }
        return payload;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_info_entity_1.UserInfo)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map