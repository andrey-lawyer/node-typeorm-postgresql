import { getConnection } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import User from '../entities/User';
import { transporter } from '../config/nodemailer';
import { ErrorUnauthorized } from '../helpers/errors';

export default class UserService {
  BASE_URL_FRONT = process.env.BASE_URL_FRONT;

  async sendEmailForgotPassword(email: string) {
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line prettier/prettier
    const verification = uuidv4();

    const emailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'password recovery',
      html: `<a target="_blank" href="${this.BASE_URL_FRONT}/new-password/${verification}">Click link</a>`
    };
    const send = await transporter.sendMail(emailOptions);
    const updateUser = await userRepository.update(
      { email: user.email },
      { ...user, verification }
    );
    if (send && updateUser) return email;
    throw new Error('update failed');
  }

  async sendEmailChangePassword(email: string, password: string) {
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new ErrorUnauthorized('Password is wrong');
    }
    // eslint-disable-next-line prettier/prettier
    const verification = uuidv4();

    const emailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'password recovery',
      html: `<a target="_blank" href="${this.BASE_URL_FRONT}/new-password/${verification}">Click link</a>`
    };

    const send = await transporter.sendMail(emailOptions);
    const updateUser = await userRepository.update(
      { email: user.email },
      { ...user, verification }
    );
    if (send && updateUser) return email;
    throw new Error('update failed');
  }

  onNewPasswordUser = async (verificationToken: string, password: string) => {
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { verification: verificationToken } });
    if (!user) {
      throw new Error('User not found');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = await userRepository.update(
      { verification: verificationToken },
      { ...user, password: hashedPassword }
    );
    return data;
  };

  verificationUser = async (verificationToken: string) => {
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({
      where: { verification: verificationToken }
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };
}
