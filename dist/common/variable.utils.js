"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryType = exports.Status = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role = exports.Role || (exports.Role = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
})(Status = exports.Status || (exports.Status = {}));
var HistoryType;
(function (HistoryType) {
    HistoryType["CREATE"] = "CREATE";
    HistoryType["READ"] = "READ";
    HistoryType["UPDATE"] = "UPDATE";
    HistoryType["DELETE"] = "DELETE";
})(HistoryType = exports.HistoryType || (exports.HistoryType = {}));
//# sourceMappingURL=variable.utils.js.map