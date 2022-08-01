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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const function_utils_1 = require("../../../common/function.utils");
const response_utils_1 = require("../../../config/response.utils");
const admin_get_users_response_1 = require("./dto/admin-get-users.response");
const user_service_1 = require("./user.service");
const jwt_utils_1 = require("../auth/jwt/jwt.utils");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(jwt, request) {
        const payload = (0, jwt_utils_1.jwtDecode)(jwt, true);
        if (!(0, function_utils_1.ApiAuthorityCheck)(payload.authority, ['Master', 'Consultant', 'PM'])) {
            return response_utils_1.RESPONSE.CANNOT_ACCESS_BY_AUTHORITY;
        }
        return this.userService.retrieveUsers(payload, request);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 조회 (객체 리스트 리턴)' }),
    (0, swagger_1.ApiHeader)({
        description: 'jwt token',
        name: 'x-access-token',
        example: 'JWT TOKEN',
    }),
    (0, swagger_1.ApiResponse)({
        status: 1000,
        description: '성공',
        type: admin_get_users_response_1.AdminGetUsersResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: 2000,
        description: '존재하지 않는 유저입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2013,
        description: '존재하지 않는 유저입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 4000,
        description: '서버 에러',
    }),
    (0, common_1.Get)('/v1'),
    __param(0, (0, common_1.Headers)('x-access-token')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
UserController = __decorate([
    (0, common_1.Controller)('admin/users'),
    (0, swagger_1.ApiTags)('Admin Users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map