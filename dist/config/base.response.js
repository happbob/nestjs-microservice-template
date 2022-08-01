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
exports.BaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BaseResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'API 성공 여부',
        required: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseResponse.prototype, "isSuccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1000,
        description: '코드 번호',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '성공',
        description: 'API 성공 메시지',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseResponse.prototype, "message", void 0);
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=base.response.js.map