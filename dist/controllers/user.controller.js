"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.verificationPassword = async (req, res) => {
            const { verificationToken } = req.params;
            const { password } = req.body;
            await this.userService.onNewPasswordUser(verificationToken, password);
            return res.status(200).json({ message: 'password updated successfully' });
        };
        this.verificationToken = async (req, res) => {
            const { verificationToken } = req.params;
            await this.userService.verificationUser(verificationToken);
            return res.status(200).json(`Verification successful`);
        };
    }
    async registerUser(req, res) {
        res.status(200).json({
            message: 'Signup successful',
            user: req.user
        });
    }
    async loginUser(req, res) {
        const { user } = req;
        const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    }
    async forgetPasswordUser(req, res) {
        const { email } = req.body;
        const emailUser = await this.userService.sendEmailForgotPassword(email);
        res.status(200).json({
            message: `mail sent successfully to ${emailUser}`
        });
    }
    async changePasswordUser(req, res) {
        const { email, password } = req.body;
        const emailUser = await this.userService.sendEmailChangePassword(email, password);
        res.status(200).json({
            message: `mail sent successfully to ${emailUser}`
        });
    }
    logoutUser(req, res) {
        console.log(req.user);
        req.session.destroy(function (err) {
            res.redirect('/');
        });
        console.log(req.user);
    }
    async currentUser(req, res) {
        res.status(200).json({
            user: req.user
        });
    }
}
exports.UserController = UserController;
const userController = new UserController(new user_service_1.default());
exports.default = userController;
//# sourceMappingURL=user.controller.js.map