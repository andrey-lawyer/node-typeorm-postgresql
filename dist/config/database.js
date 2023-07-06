"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Todo_1 = __importDefault(require("../entities/Todo"));
const User_1 = __importDefault(require("../entities/User"));
function getSSLConfig(env) {
    const configs = {
        production: { rejectUnauthorized: true },
        local: false,
        deploy: { rejectUnauthorized: false }
    };
    if (!configs[env] === undefined) {
        throw new Error('Set network in your .env file');
    }
    return configs[env];
}
const connectDB = async () => {
    try {
        const options = {
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            logging: ['query', 'error'],
            type: 'postgres',
            entities: [User_1.default, Todo_1.default],
            migrations: ['dist/migrations/**/*.{ts,js}'],
            subscribers: ['src/subscriber/**/*.ts'],
            database: process.env.POSTGRES_DB,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            ssl: false,
            synchronize: true
        };
        await (0, typeorm_1.createConnection)(options);
        console.log('MongoDB Connected...');
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log(err);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map