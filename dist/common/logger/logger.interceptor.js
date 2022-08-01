"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const logger_service_1 = require("./logger.service");
let HTTPLoggingInterceptor = class HTTPLoggingInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const loggerService = new logger_service_1.LoggerService(req.url.slice(1).split('/')[0]);
        const tempUrl = req.method + ' ' + req.url.split('?')[0];
        const _headers = JSON.stringify(req.headers ? req.headers : {});
        const _query = JSON.stringify(req.query ? req.query : {});
        const _body = JSON.stringify(req.body ? req.body : {});
        const _url = JSON.stringify(tempUrl ? tempUrl : {});
        const now = Date.now();
        const method = req.method;
        const url = req.originalUrl;
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            const delay = Date.now() - now;
            loggerService.log(`${_url} ${_headers} ${_query} ${_body} \n${JSON.stringify(data)} \ndelay = ${delay}ms`.replace(/\\/, ''));
            console.log(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
            return data;
        }), (0, rxjs_1.catchError)((error) => {
            const delay = Date.now() - now;
            console.error(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
            return (0, rxjs_1.throwError)(error);
        }));
    }
};
HTTPLoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], HTTPLoggingInterceptor);
exports.HTTPLoggingInterceptor = HTTPLoggingInterceptor;
//# sourceMappingURL=logger.interceptor.js.map