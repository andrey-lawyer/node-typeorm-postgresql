import { Router } from 'express';
// import { getConnection } from 'typeorm';
// eslint-disable-next-line import/no-named-as-default
import userController from '../../controllers/user.controller';
import { tryCatch } from '../../middleware/tryCatch';
// import IsExist from '../../middleware/validation';
import { myPassport } from '../../middleware/passport.middleware';
// import User from '../../entities/User';
import { authenticate } from '../../middleware/auth.middleware';

import IsValidate from '../../middleware/validation';

const router: Router = Router();

const isValidate = new IsValidate();

router.post(
  '/register',
  isValidate.userValidation,
  myPassport.authenticate('signup', { session: false }),
  tryCatch(userController.registerUser.bind(userController))
);

router.post(
  '/login',
  isValidate.userValidation,
  authenticate('login', { session: false }),
  tryCatch(userController.loginUser.bind(userController))
);

router.delete(
  '/logout',
  // myPassport.authenticate('jwt', { session: false }),
  tryCatch(userController.logoutUser.bind(userController))
);

router.post(
  '/forgot-password',
  isValidate.userValidationEmail,
  tryCatch(userController.forgetPasswordUser.bind(userController))
);

router.post(
  '/change-password',
  isValidate.userValidation,
  tryCatch(userController.changePasswordUser.bind(userController))
);

router.post(
  '/verify/:verificationToken',
  isValidate.userValidationPassword,
  tryCatch(userController.verificationPassword.bind(userController))
);

router.get(
  '/verify-register/:verificationToken',
  tryCatch(userController.verificationToken.bind(userController))
);

router.get(
  '/current-user',
  myPassport.authenticate('jwt', { session: false }),
  tryCatch(userController.currentUser.bind(userController))
);

export default router;
