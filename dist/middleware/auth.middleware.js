"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const errors_1 = require("../helpers/errors");
const passport_middleware_1 = require("./passport.middleware");
function authenticate(strategy, options) {
    return function (req, res, next) {
        passport_middleware_1.myPassport.authenticate(strategy, options, (error, user) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                return next(new errors_1.ErrorUnauthorized('unauthorised'));
            }
            return req.logIn(user, options, (err) => {
                if (err) {
                    return next(err);
                }
                const body = { id: user.id, email: user.email };
                req.user = body;
                return next();
            });
        })(req, res, next);
    };
}
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map