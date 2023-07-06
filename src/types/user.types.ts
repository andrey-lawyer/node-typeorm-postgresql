import { Request } from 'express';

export interface IUser {
  id?: string;
  email?: string;
  password?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
    email: string;
    logout?: Function;
  };
}
