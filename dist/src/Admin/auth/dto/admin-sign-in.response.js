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
exports.AdminSignInResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_response_1 = require("../../../../config/base.response");
class AdminSignInResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'JWT 토큰',
        description: 'JWT 토큰',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSignInResponseData.prototype, "jwt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '관리자 아이디',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminSignInResponseData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Master',
        description: '권한',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSignInResponseData.prototype, "authority", void 0);
class AdminSignInResponse extends base_response_1.BaseResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'result 객체',
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", AdminSignInResponseData)
], AdminSignInResponse.prototype, "result", void 0);
exports.AdminSignInResponse = AdminSignInResponse;
//# sourceMappingURL=admin-sign-in.response.js.map