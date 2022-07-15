import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/emails";
import "dotenv/config";
import { AppError } from "../errors/appError";

const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: "EasyIfinance@outlook.com",
      to: to,
      subject: subject,
      html :text
    })
    .then(() => {
      console.log("Email send with sucess");
    })
    .catch((err) => {
      console.log(err);
      throw new AppError(500, "error sending email");
    });
};

export { sendEmail };
