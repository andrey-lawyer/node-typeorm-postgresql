"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = __importDefault(require("../services/todo.service"));
class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getAllTodo(req, res) {
        const data = await this.todoService.findAllTodos(req);
        res.status(200).json({ data, status: 'success' });
    }
    async getOneTodo(req, res) {
        const id = req.params.todoId;
        const data = await this.todoService.getOneTodo(id);
        res.status(200).json(data);
    }
    async addOneTodo(req, res) {
        const newTodo = req.body;
        const { user } = req;
        if (user) {
            const data = await this.todoService.addTodo(newTodo, user);
            res.status(201).json({ data, status: 'success' });
        }
        else
            res.status(403).json({ status: 'you do not have rights to this operation' });
    }
    async deleteTodoId(req, res) {
        const id = req.params.todoId;
        await this.todoService.removeTodo(req, id);
        return res.status(200).json({ massage: `todo with id ${id} was removed` });
    }
    async updateTodoId(req, res) {
        const id = req.params.todoId;
        const todo = req.body;
        await this.todoService.updateTodo(req, todo, id);
        res.status(200).json({ massage: `todo with id ${id} was updated` });
    }
}
exports.TodoController = TodoController;
const todoController = new TodoController(new todo_service_1.default());
exports.default = todoController;
//# sourceMappingURL=todo.controller.js.map