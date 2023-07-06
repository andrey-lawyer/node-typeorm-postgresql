"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Todo_1 = __importDefault(require("../entities/Todo"));
class TodoService {
    async findAllTodos(req) {
        const newConnection = (0, typeorm_1.getConnection)();
        const todoRepository = newConnection.getRepository(Todo_1.default);
        const { search, status, access } = req.query;
        const { page = '1', limit = '10' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const statusBoolean = status === 'done' ? true : false;
        const newAccess = access ? [access] : ['public', 'private'];
        const newStatus = status ? [statusBoolean] : [true, false];
        if (!req.user) {
            if (search) {
                return await todoRepository.find({
                    skip: skip,
                    take: take,
                    where: {
                        access: 'public',
                        complete: (0, typeorm_1.In)(newStatus),
                        title: (0, typeorm_1.In)([search])
                    }
                });
            }
            return await todoRepository.find({
                skip: skip,
                take: take,
                where: {
                    access: 'public',
                    complete: (0, typeorm_1.In)(newStatus)
                }
            });
        }
        let data;
        if (search) {
            data = await todoRepository.find({
                skip: skip,
                take: take,
                where: {
                    access: (0, typeorm_1.In)(newAccess),
                    complete: (0, typeorm_1.In)(newStatus),
                    title: (0, typeorm_1.In)([search])
                }
            });
        }
        else {
            data = await todoRepository.find({
                skip: skip,
                take: take,
                where: {
                    access: (0, typeorm_1.In)(newAccess),
                    complete: (0, typeorm_1.In)(newStatus)
                }
            });
        }
        return data;
    }
    async getOneTodo(todoId) {
        const newConnection = (0, typeorm_1.getConnection)();
        const todoRepository = newConnection.getRepository(Todo_1.default);
        const todoIdNumber = Number(todoId);
        const oneTodo = await todoRepository.findOne({ where: { id: todoIdNumber } });
        return oneTodo;
    }
    async addTodo(todo, user) {
        const newConnection = await (0, typeorm_1.getConnection)();
        const todoRepository = newConnection.getRepository(Todo_1.default);
        const newTodo = Object.assign(Object.assign({}, todo), { idUser: user.id });
        const data = await todoRepository.save(newTodo);
        return data;
    }
    async removeTodo(req, todoId) {
        const { user } = req;
        const newConnection = (0, typeorm_1.getConnection)();
        const todoRepository = newConnection.getRepository(Todo_1.default);
        const findUser = await todoRepository.findOneBy({
            idUser: user.id
        });
        if (!findUser)
            throw new Error('you do not have rights to this operation');
        const removeTodo = await todoRepository.delete({ id: todoId });
        return removeTodo;
    }
    async updateTodo(req, todo, todoId) {
        const { user } = req;
        const newConnection = (0, typeorm_1.getConnection)();
        const todoRepository = newConnection.getRepository(Todo_1.default);
        const findUser = await todoRepository.findOneBy({
            idUser: user.id
        });
        if (!findUser)
            throw new Error('you do not have rights to this operation');
        const updateTodo = await todoRepository.update({ id: todoId }, Object.assign({}, todo));
        return updateTodo;
    }
}
exports.default = TodoService;
//# sourceMappingURL=todo.service.js.map