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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const function_utils_1 = require("../../../common/function.utils");
const response_utils_1 = require("../../../config/response.utils");
const user_info_entity_1 = require("../../entity/user-info.entity");
const user_salt_entity_1 = require("../../entity/user-salt.entity");
const typeorm_2 = require("typeorm");
const security_utils_1 = require("../../../config/security.utils");
const variable_utils_1 = require("../../../common/variable.utils");
let AuthService = class AuthService {
    constructor(userRepository, userSaltRepository, jwtService, connection) {
        this.userRepository = userRepository;
        this.userSaltRepository = userSaltRepository;
        this.jwtService = jwtService;
        this.connection = connection;
    }
    async signInUser(request, signInRequest) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: signInRequest.email, status: 'ACTIVE' },
            });
            if (user == undefined) {
                return response_utils_1.RESPONSE.NON_EXIST_EMAIL;
            }
            const userSalt = await this.userSaltRepository.findOne({
                where: { userId: user.id },
            });
            if (!(0, security_utils_1.validatePassword)(signInRequest.password, userSalt.salt, user.password)) {
                return response_utils_1.RESPONSE.NON_MATCH_PASSWORD;
            }
            const payload = {
                id: user.id,
                email: signInRequest.email,
                role: variable_utils_1.Role.USER,
            };
            const token = await this.jwtService.sign(payload);
            const data = {
                jwt: token,
                id: user.id,
                email: signInRequest.email,
            };
            const result = (0, function_utils_1.makeResponse)(response_utils_1.RESPONSE.SUCCESS, data);
            await (0, function_utils_1.saveApiCallHistory)(variable_utils_1.HistoryType.READ, variable_utils_1.Role.USER, '[유저] 로그인 API', request, result);
            return result;
        }
        catch (error) {
            return response_utils_1.RESPONSE.ERROR;
        }
    }
    async signUpUser(request, signUpRequest) {
        const securityData = (0, security_utils_1.saltHashPassword)(signUpRequest.password);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const isExistUserByEmail = await this.userRepository.count({
                where: { email: signUpRequest.email, status: 'ACTIVE' },
            });
            if (isExistUserByEmail > 0) {
                return response_utils_1.RESPONSE.EXIST_EMAIL;
            }
            const userInfo = new user_info_entity_1.UserInfo();
            userInfo.email = signUpRequest.email;
            userInfo.password = securityData.hashedPassword;
            userInfo.nickname = signUpRequest.nickname;
            const createUserData = await queryRunner.manager.save(userInfo);
            const userSalt = new user_salt_entity_1.UserSalt();
            userSalt.salt = securityData.salt;
            userSalt.userId = createUserData.id;
            await queryRunner.manager.save(userSalt);
            const data = {
                id: createUserData.id,
                email: createUserData.email,
            };
            const result = (0, function_utils_1.makeResponse)(response_utils_1.RESPONSE.SUCCESS, data);
            await (0, function_utils_1.saveApiCallHistory)(variable_utils_1.HistoryType.CREATE, variable_utils_1.Role.USER, '[유저] 회원가입 API', request, result);
            await queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return response_utils_1.RESPONSE.ERROR;
        }
        finally {
            await queryRunner.release();
        }
    }
    async isExistUser(id) {
        try {
            const admin = await this.userRepository.findOne({
                where: { id: id, status: variable_utils_1.Status.ACTIVE },
            });
            if (admin == undefined) {
                return false;
            }
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(response_utils_1.RESPONSE.ERROR, 200);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_info_entity_1.UserInfo)),
    __param(1, (0, typeorm_1.InjectRepository)(user_salt_entity_1.UserSalt)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Connection !== "undefined" && typeorm_2.Connection) === "function" ? _d : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map