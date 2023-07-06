"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExist = void 0;
const typeorm_1 = require("typeorm");
const Todo_1 = __importDefault(require("../entities/Todo"));
const isExist = async (req, res, next) => {
    const { todoId } = req.params;
    const newConnection = (0, typeorm_1.getConnection)();
    const todoRepository = newConnection.getRepository(Todo_1.default);
    const todo = await todoRepository.findOne({ where: { id: todoId } });
    if (todo) {
        next();
    }
    else {
        res.status(400).json('Not found');
    }
};
exports.isExist = isExist;
//# sourceMappingURL=isExist.js.map