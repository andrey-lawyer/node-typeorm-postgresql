import { Request, Response, NextFunction } from 'express';
export default class IsExist {
    validateRequest: (schema: any, req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    userValidation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addTodoValidation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTodoValidation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
