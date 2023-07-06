// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';

const config = {
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
};

// eslint-disable-next-line prettier/prettier
export const transporter = nodemailer.createTransport(config);
