"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../../controllers/todo.controller"));
const validation_1 = __importDefault(require("../../middleware/validation"));
const tryCatch_1 = require("../../middleware/tryCatch");
const isExist_1 = require("../../middleware/isExist");
const passport_middleware_1 = require("../../middleware/passport.middleware");
const todosRouter = (0, express_1.Router)();
const isValidate = new validation_1.default();
todosRouter.get('/', passport_middleware_1.myPassport.authenticate(['jwt', 'anonymous'], { session: false }), (0, tryCatch_1.tryCatch)(todo_controller_1.default.getAllTodo.bind(todo_controller_1.default)));
todosRouter.get('/:todoId', isExist_1.isExist, (0, tryCatch_1.tryCatch)(todo_controller_1.default.getOneTodo.bind(todo_controller_1.default)));
todosRouter.post('/', passport_middleware_1.myPassport.authenticate('jwt', { session: false }), isValidate.addTodoValidation, (0, tryCatch_1.tryCatch)(todo_controller_1.default.addOneTodo.bind(todo_controller_1.default)));
todosRouter.delete('/:todoId', passport_middleware_1.myPassport.authenticate('jwt', { session: false }), isExist_1.isExist, (0, tryCatch_1.tryCatch)(todo_controller_1.default.deleteTodoId.bind(todo_controller_1.default)));
todosRouter.put('/:todoId', passport_middleware_1.myPassport.authenticate('jwt', { session: false }), isValidate.updateTodoValidation, isExist_1.isExist, (0, tryCatch_1.tryCatch)(todo_controller_1.default.updateTodoId.bind(todo_controller_1.default)));
exports.default = todosRouter;
//# sourceMappingURL=todos.route.js.map