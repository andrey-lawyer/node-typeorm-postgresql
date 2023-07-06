import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { IGetUserAuthInfoRequest } from '../types/user.types';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: IGetUserAuthInfoRequest, res: Response) {
    const data = await this.todoService.findAllTodos(req);

    res.status(200).json({ data, status: 'success' });
  }

  async getOneTodo(req: Request, res: Response) {
    const id = req.params.todoId;
    const data = await this.todoService.getOneTodo(id);
    res.status(200).json(data);
  }

  async addOneTodo(req: IGetUserAuthInfoRequest, res: Response) {
    const newTodo = req.body;
    const { user } = req;
    if (user) {
      const data = await this.todoService.addTodo(newTodo, user);
      res.status(201).json({ data, status: 'success' });
    } else res.status(403).json({ status: 'you do not have rights to this operation' });
  }

  async deleteTodoId(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.todoId;
    await this.todoService.removeTodo(req, id);
    return res.status(200).json({ massage: `todo with id ${id} was removed` });
  }

  async updateTodoId(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.todoId;
    const todo = req.body;

    await this.todoService.updateTodo(req, todo, id);
    res.status(200).json({ massage: `todo with id ${id} was updated` });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
