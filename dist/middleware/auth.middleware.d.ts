import { Request, Response, NextFunction } from 'express';
import { IOptions } from '../types/strategy';
export declare function authenticate(strategy: string, options: IOptions): (req: Request, res: Response, next: NextFunction) => void;
