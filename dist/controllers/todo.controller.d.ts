import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { IGetUserAuthInfoRequest } from '../types/user.types';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    getAllTodo(req: IGetUserAuthInfoRequest, res: Response): Promise<void>;
    getOneTodo(req: Request, res: Response): Promise<void>;
    addOneTodo(req: IGetUserAuthInfoRequest, res: Response): Promise<void>;
    deleteTodoId(req: IGetUserAuthInfoRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    updateTodoId(req: IGetUserAuthInfoRequest, res: Response): Promise<void>;
}
declare const todoController: TodoController;
export default todoController;
