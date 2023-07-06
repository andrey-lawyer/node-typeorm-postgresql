import Todo from '../entities/Todo';
import { ITodo } from '../types/todos.type';
import { IGetUserAuthInfoRequest, IUser } from '../types/user.types';
export default class TodoService {
    findAllTodos(req: IGetUserAuthInfoRequest): Promise<Todo[]>;
    getOneTodo(todoId: string): Promise<Todo | null>;
    addTodo(todo: ITodo, user: IUser): Promise<{
        idUser: string | undefined;
        id?: string | number | undefined;
        title: string;
        description: string;
        complete: boolean;
        access: import("../types/todos.type").IsAccess;
    } & Todo>;
    removeTodo(req: IGetUserAuthInfoRequest, todoId: string): Promise<import("typeorm").DeleteResult>;
    updateTodo(req: IGetUserAuthInfoRequest, todo: ITodo, todoId: string): Promise<import("typeorm").UpdateResult>;
}
