"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_local_1 = require("passport-local");
const passport_anonymous_1 = require("passport-anonymous");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
const errors_1 = require("../helpers/errors");
exports.myPassport = new passport_1.default.Passport();
const { Strategy, ExtractJwt } = passport_jwt_1.default;
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
        const newUser = await userRepository.save({ email, password: hashedPassword });
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
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            throw new errors_1.ErrorUnauthorized('Password is wrong');
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
exports.myPassport.use(new Strategy({
    secretOrKey: 'TOP_SECRET',
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
//# sourceMappingURL=pasport.middleware.js.map