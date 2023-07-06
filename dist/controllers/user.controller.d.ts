import { Response, Request } from 'express';
import 'dotenv/config';
import UserService from '../services/user.service';
import { IGetUserAuthInfoRequest } from '../types/user.types';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    registerUser(req: IGetUserAuthInfoRequest, res: Response): Promise<void>;
    loginUser(req: IGetUserAuthInfoRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    forgetPasswordUser(req: Request, res: Response): Promise<void>;
    changePasswordUser(req: Request, res: Response): Promise<void>;
    verificationPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    verificationToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    logoutUser(req: Request, res: Response): void;
    currentUser(req: IGetUserAuthInfoRequest, res: Response): Promise<void>;
}
declare const userController: UserController;
export default userController;
