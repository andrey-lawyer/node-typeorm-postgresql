import { BaseEntity } from 'typeorm';
import User from './User';
import { IsAccess } from '../types/todos.type';
export default class Todo extends BaseEntity {
    id: string | number;
    title: string;
    description: string;
    complete: boolean;
    access: IsAccess;
    idUser: string;
    user: User;
}
