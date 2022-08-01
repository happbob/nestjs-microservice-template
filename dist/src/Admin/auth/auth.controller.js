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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../decorators/auth.decorator");
const auth_service_1 = require("./auth.service");
const admin_sign_in_request_1 = require("./dto/admin-sign-in.request");
const admin_sign_in_response_1 = require("./dto/admin-sign-in.response");
const admin_sign_up_request_1 = require("./dto/admin-sign-up.request");
const admin_sign_up_response_1 = require("./dto/admin-sign-up.response");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    postSignIn(req, signInRequest) {
        return this.authService.signInUser(req, signInRequest);
    }
    postSignUp(req, signUpRequest) {
        return this.authService.signUpUser(req, signUpRequest);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 1000,
        description: '성공',
        type: admin_sign_in_response_1.AdminSignInResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: 2000,
        description: 'JWT 토큰을 확인해주세요.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2004,
        description: '이메일을 입력해주세요.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2005,
        description: '유효하지 않은 이메일 입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2006,
        description: '비밀번호를 입력해주세요',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2007,
        description: '유효하지 않은 비밀번호 입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2002,
        description: '이메일을 확인해주세요',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2003,
        description: '비밀번호가 일치하지 않습니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2015,
        description: '유효하지 않은 권한입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 4000,
        description: '서버 에러',
    }),
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, swagger_1.ApiBody)({ description: '로그인 DTO', type: admin_sign_in_request_1.AdminSignInRequest }),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, auth_decorator_1.SignInUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_sign_in_request_1.AdminSignInRequest]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "postSignIn", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 1000,
        description: '성공',
        type: admin_sign_up_response_1.AdminSignUpResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: 2004,
        description: '이메일을 입력해주세요.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2005,
        description: '유효하지 않은 이메일 입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2006,
        description: '비밀번호를 입력해주세요.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2007,
        description: '유효하지 않은 비밀번호 입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2008,
        description: '확인 비밀번호를 입력해주세요.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2009,
        description: '유효하지 않은 확인 비밀번호 입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2010,
        description: '확인 비밀번호와 일치하지 않습니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2012,
        description: '이미 사용중인 이메일입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2014,
        description: '권한을 입력해주세요.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 2015,
        description: '유효하지 않은 권한입니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 4000,
        description: '서버 에러',
    }),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, swagger_1.ApiBody)({ description: '회원가입 DTO', type: admin_sign_up_request_1.AdminSignUpRequest }),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, auth_decorator_1.SignUpUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_sign_up_request_1.AdminSignUpRequest]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "postSignUp", null);
AuthController = __decorate([
    (0, common_1.Controller)('admin/auth'),
    (0, swagger_1.ApiTags)('Admin Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map