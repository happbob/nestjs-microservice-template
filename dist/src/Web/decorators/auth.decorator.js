"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUser = exports.SignInUser = void 0;
const common_1 = require("@nestjs/common");
const regularExp_1 = require("../../../config/regularExp");
const response_utils_1 = require("../../../config/response.utils");
exports.SignInUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const body = ctx.switchToHttp().getRequest().body;
    if (!body.email) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp_1.regularExp.emailRegex.test(body.email)) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.INVALID_EMAIL, 201);
    }
    if (!body.password) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp_1.regularExp.passwordRegex.test(body.password)) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.INVALID_PASSWORD, 201);
    }
    return body;
});
exports.SignUpUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const body = ctx.switchToHttp().getRequest().body;
    if (!body.email) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp_1.regularExp.emailRegex.test(body.email)) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.INVALID_EMAIL, 201);
    }
    if (!body.password) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp_1.regularExp.passwordRegex.test(body.password)) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.INVALID_PASSWORD, 201);
    }
    if (!body.confirmPassword) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.EMPTY_CONFIRM_PASSWORD, 201);
    }
    if (!regularExp_1.regularExp.passwordRegex.test(body.confirmPassword)) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.INVALID_CONFIRM_PASSWORD, 201);
    }
    if (body.password !== body.confirmPassword) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.NOT_MATCH_CONFIRM_PASSWORD, 201);
    }
    if (!body.nickname) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.EMPTY_NICKNAME, 201);
    }
    if (body.nickname.length > 20) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.INVALID_NICKNAME, 201);
    }
    return body;
});
//# sourceMappingURL=auth.decorator.js.map