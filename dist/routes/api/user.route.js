"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const tryCatch_1 = require("../../middleware/tryCatch");
const passport_middleware_1 = require("../../middleware/passport.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validation_1 = __importDefault(require("../../middleware/validation"));
const router = (0, express_1.Router)();
const isValidate = new validation_1.default();
router.post('/register', isValidate.userValidation, passport_middleware_1.myPassport.authenticate('signup', { session: false }), (0, tryCatch_1.tryCatch)(user_controller_1.default.registerUser.bind(user_controller_1.default)));
router.post('/login', isValidate.userValidation, (0, auth_middleware_1.authenticate)('login', { session: false }), (0, tryCatch_1.tryCatch)(user_controller_1.default.loginUser.bind(user_controller_1.default)));
router.delete('/logout', (0, tryCatch_1.tryCatch)(user_controller_1.default.logoutUser.bind(user_controller_1.default)));
router.post('/forgot-password', isValidate.userValidationEmail, (0, tryCatch_1.tryCatch)(user_controller_1.default.forgetPasswordUser.bind(user_controller_1.default)));
router.post('/change-password', isValidate.userValidation, (0, tryCatch_1.tryCatch)(user_controller_1.default.changePasswordUser.bind(user_controller_1.default)));
router.post('/verify/:verificationToken', isValidate.userValidationPassword, (0, tryCatch_1.tryCatch)(user_controller_1.default.verificationPassword.bind(user_controller_1.default)));
router.get('/verify-register/:verificationToken', (0, tryCatch_1.tryCatch)(user_controller_1.default.verificationToken.bind(user_controller_1.default)));
router.get('/current-user', passport_middleware_1.myPassport.authenticate('jwt', { session: false }), (0, tryCatch_1.tryCatch)(user_controller_1.default.currentUser.bind(user_controller_1.default)));
exports.default = router;
//# sourceMappingURL=user.route.js.map