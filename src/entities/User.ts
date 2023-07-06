import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import Todo from './Todo';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  verification?: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
