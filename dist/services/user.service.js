"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../entities/User"));
const nodemailer_1 = require("../config/nodemailer");
const errors_1 = require("../helpers/errors");
class UserService {
    constructor() {
        this.BASE_URL_FRONT = process.env.BASE_URL_FRONT;
        this.onNewPasswordUser = async (verificationToken, password) => {
            const newConnection = await (0, typeorm_1.getConnection)();
            const userRepository = newConnection.getRepository(User_1.default);
            const user = await userRepository.findOne({ where: { verification: verificationToken } });
            if (!user) {
                throw new Error('User not found');
            }
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const data = await userRepository.update({ verification: verificationToken }, Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return data;
        };
        this.verificationUser = async (verificationToken) => {
            const newConnection = await (0, typeorm_1.getConnection)();
            const userRepository = newConnection.getRepository(User_1.default);
            const user = await userRepository.findOne({
                where: { verification: verificationToken }
            });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        };
    }
    async sendEmailForgotPassword(email) {
        const newConnection = await (0, typeorm_1.getConnection)();
        const userRepository = newConnection.getRepository(User_1.default);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const verification = (0, uuid_1.v4)();
        const emailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'password recovery',
            html: `<a target="_blank" href="${this.BASE_URL_FRONT}/new-password/${verification}">Click link</a>`
        };
        const send = await nodemailer_1.transporter.sendMail(emailOptions);
        const updateUser = await userRepository.update({ email: user.email }, Object.assign(Object.assign({}, user), { verification }));
        if (send && updateUser)
            return email;
        throw new Error('update failed');
    }
    async sendEmailChangePassword(email, password) {
        const newConnection = await (0, typeorm_1.getConnection)();
        const userRepository = newConnection.getRepository(User_1.default);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            throw new errors_1.ErrorUnauthorized('Password is wrong');
        }
        const verification = (0, uuid_1.v4)();
        const emailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'password recovery',
            html: `<a target="_blank" href="${this.BASE_URL_FRONT}/new-password/${verification}">Click link</a>`
        };
        const send = await nodemailer_1.transporter.sendMail(emailOptions);
        const updateUser = await userRepository.update({ email: user.email }, Object.assign(Object.assign({}, user), { verification }));
        if (send && updateUser)
            return email;
        throw new Error('update failed');
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map