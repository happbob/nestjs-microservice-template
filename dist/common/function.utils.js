"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveApiCallHistory = exports.ApiAuthorityCheck = exports.makeResponse = void 0;
const common_1 = require("@nestjs/common");
const response_utils_1 = require("../config/response.utils");
const typeorm_1 = require("typeorm");
function makeResponse(response, data) {
    response.result = data;
    return response;
}
exports.makeResponse = makeResponse;
function ApiAuthorityCheck(authority, list) {
    if (list.indexOf(authority) === -1) {
        return false;
    }
    return true;
}
exports.ApiAuthorityCheck = ApiAuthorityCheck;
async function saveApiCallHistory(historyType, userType, apiName, req, res) {
    let id = 0;
    let queryString = null;
    let pathVariable = null;
    let body = null;
    try {
        if (req.user != undefined) {
            id = req.user.id;
        }
        if (req.query != undefined) {
            queryString = req.query;
        }
        if (req.params != undefined) {
            pathVariable = req.params;
        }
        if (req.body != undefined) {
            body = req.body;
        }
        const query = `
      INSERT INTO ApiCallHistory(historyType, userType, savedId, apiUri, apiName, apiMethod,
      requestQuery, requestBody, requestParams, response, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '활성화', CURRENT_TIMESTAMP)
    `;
        const param = [
            historyType,
            userType,
            id,
            req.url,
            apiName,
            req.method,
            JSON.stringify(queryString),
            JSON.stringify(body),
            JSON.stringify(pathVariable),
            JSON.stringify(res),
        ];
        const entityManager = (0, typeorm_1.getManager)();
        await entityManager.query(query, param);
    }
    catch (error) {
        throw new common_1.HttpException(response_utils_1.RESPONSE.ERROR, 201);
    }
}
exports.saveApiCallHistory = saveApiCallHistory;
//# sourceMappingURL=function.utils.js.map