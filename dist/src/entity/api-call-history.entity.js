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
exports.ApiCallHistory = void 0;
const typeorm_1 = require("typeorm");
let ApiCallHistory = class ApiCallHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], ApiCallHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "historyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApiCallHistory.prototype, "savedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "apiUri", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "apiName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "apiMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "requestQuery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "requestBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "requestParams", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: null }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'ACTIVE' }),
    __metadata("design:type", String)
], ApiCallHistory.prototype, "status", void 0);
ApiCallHistory = __decorate([
    (0, typeorm_1.Entity)('ApiCallHistory')
], ApiCallHistory);
exports.ApiCallHistory = ApiCallHistory;
//# sourceMappingURL=api-call-history.entity.js.map