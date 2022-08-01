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
exports.AdminGetUsersResponse = exports.AdminGetUsersResponseData = exports.AdminGetUsersResponseDataDetail = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_response_1 = require("../../../../config/base.response");
class AdminGetUsersResponseDataDetail {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '유저 아이디',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminGetUsersResponseDataDetail.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@email.com',
        description: '이메일',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminGetUsersResponseDataDetail.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '쿠키',
        description: '닉네임 (PM, Consultant는 조회 불가능)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminGetUsersResponseDataDetail.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-05-27T02:06:44.000Z',
        description: '생성 날짜',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminGetUsersResponseDataDetail.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ACTIVE',
        description: '회원 상태',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminGetUsersResponseDataDetail.prototype, "status", void 0);
exports.AdminGetUsersResponseDataDetail = AdminGetUsersResponseDataDetail;
class AdminGetUsersResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user 객체 리스트',
        type: AdminGetUsersResponseDataDetail,
        required: true,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AdminGetUsersResponseData.prototype, "users", void 0);
exports.AdminGetUsersResponseData = AdminGetUsersResponseData;
class AdminGetUsersResponse extends base_response_1.BaseResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'result 객체',
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", AdminGetUsersResponseData)
], AdminGetUsersResponse.prototype, "result", void 0);
exports.AdminGetUsersResponse = AdminGetUsersResponse;
//# sourceMappingURL=admin-get-users.response.js.map