import { Request, Response, NextFunction } from 'express';
import { ErrorUnauthorized } from '../helpers/errors';
import { IOptions } from '../types/strategy';
import { IUser } from '../types/user.types';
import { myPassport } from './passport.middleware';

export function authenticate(strategy: string, options: IOptions) {
  return function (req: Request, res: Response, next: NextFunction) {
    myPassport.authenticate(strategy, options, (error: Error, user: IUser) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return next(new ErrorUnauthorized('unauthorised'));
      }
      return req.logIn(user, options, (err) => {
        if (err) {
          return next(err);
        }
        const body = { id: user.id, email: user.email };
        req.user = body;
        return next();
      });
    })(req, res, next);
  };
}
