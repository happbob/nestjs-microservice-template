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
exports.SignInResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_response_1 = require("../../../../config/base.response");
class SignInResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'JWT 토큰',
        description: 'JWT 토큰',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignInResponseData.prototype, "jwt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '유저 아이디',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SignInResponseData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@email.com',
        description: '이메일',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignInResponseData.prototype, "email", void 0);
class SignInResponse extends base_response_1.BaseResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'result 객체',
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", SignInResponseData)
], SignInResponse.prototype, "result", void 0);
exports.SignInResponse = SignInResponse;
//# sourceMappingURL=sign-in.response.js.map