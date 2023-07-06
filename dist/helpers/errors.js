"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnauthorized = exports.ErrorForbidden = void 0;
class ErrorForbidden extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}
exports.ErrorForbidden = ErrorForbidden;
class ErrorUnauthorized extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.ErrorUnauthorized = ErrorUnauthorized;
//# sourceMappingURL=errors.js.map