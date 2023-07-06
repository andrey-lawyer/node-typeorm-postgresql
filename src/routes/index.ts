import { Application } from 'express';
//
import { myPassport } from '../middleware/passport.middleware';
import path from 'path';
import todosRouter from './api/todos.route';
import userRouter from './api/user.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      console.log('API Running');
      res.send('API Running');
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    this.app.use(myPassport.initialize());
    this.app.use(myPassport.session());
    //
    this.app.use('/api/todos', todosRouter);
    this.app.use('/api/user', userRouter);
  }
}

export default AppRouter;
