import { Request, Response, NextFunction } from 'express';
export default class IsValidate {
    userValidation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userValidationEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userValidationPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    validateRequest: (schema: any, req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    addTodoValidation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTodoValidation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
