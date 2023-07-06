import { BaseEntity } from 'typeorm';
import Todo from './Todo';
export default class User extends BaseEntity {
    id: string;
    email: string;
    password: string;
    verification?: string;
    todos: Todo[];
}
