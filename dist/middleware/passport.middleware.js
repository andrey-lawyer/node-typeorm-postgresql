"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const passport_local_1 = require("passport-local");
const passport_anonymous_1 = require("passport-anonymous");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
const errors_1 = require("../helpers/errors");
const nodemailer_1 = require("../config/nodemailer");
exports.myPassport = new passport_1.default.Passport();
const { Strategy, ExtractJwt } = passport_jwt_1.default;
const BASE_URL_BACK = process.env.BASE_URL_BACK;
exports.myPassport.use('signup', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const newConnection = await (0, typeorm_1.getConnection)();
    const userRepository = newConnection.getRepository(User_1.default);
    try {
        const user = await userRepository.findOne({ where: { email } });
        if (user) {
            throw new errors_1.ErrorForbidden('User already registered');
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const verification = (0, uuid_1.v4)();
        const emailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'password recovery',
            html: `<a target="_blank" href="${BASE_URL_BACK}/user/verify-register/${verification}">Click link</a>`
        };
        const send = await nodemailer_1.transporter.sendMail(emailOptions);
        await userRepository.save({
            email,
            password: hashedPassword,
            verification
        });
        const newUser = { email, password: hashedPassword };
        return done(null, newUser);
    }
    catch (error) {
        done(error);
    }
}));
exports.myPassport.use('login', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const newConnection = await (0, typeorm_1.getConnection)();
    const userRepository = newConnection.getRepository(User_1.default);
    try {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (!user.verification) {
            throw new errors_1.ErrorUnauthorized('Please confirm your email.');
        }
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            throw new errors_1.ErrorUnauthorized('Password is wrong');
        }
        console.log(user);
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
exports.myPassport.use(new Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
}));
exports.myPassport.use(new passport_anonymous_1.Strategy());
//# sourceMappingURL=passport.middleware.js.map