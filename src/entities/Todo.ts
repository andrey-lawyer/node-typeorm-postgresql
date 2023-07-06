import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';
import { IsAccess } from '../types/todos.type';

@Entity()
export default class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string | number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  complete: boolean;

  @Column()
  access: IsAccess;

  @Column()
  idUser: string;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
