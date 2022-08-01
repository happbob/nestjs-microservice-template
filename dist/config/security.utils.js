"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.saltHashPassword = exports.sha512 = exports.generateRandomString = void 0;
const crypto = require("crypto");
function generateRandomString(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}
exports.generateRandomString = generateRandomString;
function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return {
        salt: salt,
        hashedPassword: hashedPassword,
    };
}
exports.sha512 = sha512;
function saltHashPassword(password) {
    const salt = generateRandomString(16);
    return sha512(password, salt);
}
exports.saltHashPassword = saltHashPassword;
function validatePassword(password, salt, hashedPassword) {
    const passwordData = sha512(password, salt);
    return passwordData.hashedPassword == hashedPassword;
}
exports.validatePassword = validatePassword;
//# sourceMappingURL=security.utils.js.map