import User from '../entities/User';
export default class UserService {
    BASE_URL_FRONT: string | undefined;
    sendEmailForgotPassword(email: string): Promise<string>;
    sendEmailChangePassword(email: string, password: string): Promise<string>;
    onNewPasswordUser: (verificationToken: string, password: string) => Promise<import("typeorm").UpdateResult>;
    verificationUser: (verificationToken: string) => Promise<User>;
}
