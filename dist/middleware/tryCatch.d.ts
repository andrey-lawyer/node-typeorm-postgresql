import { Request, Response, NextFunction } from 'express';
export declare const tryCatch: (controller: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
