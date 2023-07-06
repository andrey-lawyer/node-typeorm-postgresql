import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import IsValidate from '../../middleware/validation';
import { tryCatch } from '../../middleware/tryCatch';
import { isExist } from '../../middleware/isExist';
import { myPassport } from '../../middleware/passport.middleware';

const todosRouter: Router = Router();
const isValidate = new IsValidate();

todosRouter.get(
  '/',
  myPassport.authenticate(['jwt', 'anonymous'], { session: false }),
  tryCatch(todoController.getAllTodo.bind(todoController))
);

todosRouter.get('/:todoId', isExist, tryCatch(todoController.getOneTodo.bind(todoController)));

todosRouter.post(
  '/',
  myPassport.authenticate('jwt', { session: false }),
  isValidate.addTodoValidation,
  tryCatch(todoController.addOneTodo.bind(todoController))
);

todosRouter.delete(
  '/:todoId',
  myPassport.authenticate('jwt', { session: false }),
  isExist,
  tryCatch(todoController.deleteTodoId.bind(todoController))
);
todosRouter.put(
  '/:todoId',
  myPassport.authenticate('jwt', { session: false }),
  isValidate.updateTodoValidation,
  isExist,
  tryCatch(todoController.updateTodoId.bind(todoController))
);

export default todosRouter;
