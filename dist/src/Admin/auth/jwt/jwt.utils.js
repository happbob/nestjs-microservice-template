"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtDecode = void 0;
const common_1 = require("@nestjs/common");
const variable_utils_1 = require("../../../../common/variable.utils");
const response_utils_1 = require("../../../../config/response.utils");
const jwt_decode_1 = require("jwt-decode");
function jwtDecode(jwt, required) {
    if (required) {
        try {
            const payload = (0, jwt_decode_1.default)(jwt);
            if (payload.role !== variable_utils_1.Role.ADMIN) {
                throw new common_1.HttpException(response_utils_1.RESPONSE.CHECK_JWT_TOKEN, 201);
            }
            return payload;
        }
        catch (error) {
            throw new common_1.HttpException(response_utils_1.RESPONSE.CHECK_JWT_TOKEN, 201);
        }
    }
    else {
        if (jwt != undefined) {
            try {
                const payload = (0, jwt_decode_1.default)(jwt);
                return payload;
            }
            catch (error) {
                throw new common_1.HttpException(response_utils_1.RESPONSE.CHECK_JWT_TOKEN, 201);
            }
        }
        else {
            return undefined;
        }
    }
}
exports.jwtDecode = jwtDecode;
//# sourceMappingURL=jwt.utils.js.map