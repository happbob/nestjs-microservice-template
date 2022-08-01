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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const function_utils_1 = require("../../../common/function.utils");
const variable_utils_1 = require("../../../common/variable.utils");
const response_utils_1 = require("../../../config/response.utils");
const user_info_entity_1 = require("../../entity/user-info.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async retrieveUsers(payload, request) {
        try {
            let users = [];
            if (payload.authority === 'Master') {
                users = await (0, typeorm_2.getManager)()
                    .createQueryBuilder(user_info_entity_1.UserInfo, 'user')
                    .select([
                    'user.id',
                    'user.email',
                    'user.nickname',
                    'user.createdAt',
                    'user.status',
                ])
                    .getMany();
            }
            else if (payload.authority == 'Consultant') {
                users = await (0, typeorm_2.getManager)()
                    .createQueryBuilder(user_info_entity_1.UserInfo, 'user')
                    .select(['user.id', 'user.email', 'user.createdAt', 'user.status'])
                    .getMany();
            }
            else {
                users = await (0, typeorm_2.getManager)()
                    .createQueryBuilder(user_info_entity_1.UserInfo, 'user')
                    .select(['user.id', 'user.email', 'user.createdAt', 'user.status'])
                    .getMany();
            }
            const data = {
                users: users,
            };
            const result = (0, function_utils_1.makeResponse)(response_utils_1.RESPONSE.SUCCESS, data);
            await (0, function_utils_1.saveApiCallHistory)(variable_utils_1.HistoryType.READ, variable_utils_1.Role.ADMIN, '[관리자] 유저 리스트 조회 API', request, result);
            return result;
        }
        catch (error) {
            return response_utils_1.RESPONSE.ERROR;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_info_entity_1.UserInfo)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map