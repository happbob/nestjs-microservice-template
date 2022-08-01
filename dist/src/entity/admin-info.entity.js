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
exports.AdminInfo = void 0;
const typeorm_1 = require("typeorm");
let AdminInfo = class AdminInfo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40 }),
    __metadata("design:type", String)
], AdminInfo.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 256 }),
    __metadata("design:type", String)
], AdminInfo.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AdminInfo.prototype, "authority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], AdminInfo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", String)
], AdminInfo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'ACTIVE' }),
    __metadata("design:type", String)
], AdminInfo.prototype, "status", void 0);
AdminInfo = __decorate([
    (0, typeorm_1.Entity)('AdminInfo')
], AdminInfo);
exports.AdminInfo = AdminInfo;
//# sourceMappingURL=admin-info.entity.js.map