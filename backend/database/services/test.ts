import dotenv from "dotenv";
import nodemailer from "nodemailer";



dotenv.config();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error("Error connecting to SMTP server:", error);
      } else {
        console.log("SMTP server is ready to send emails.");
      }
    });
    
    const confirmURL = `http://localhost:5173/confirm-email?token=1211`;

    transporter.sendMail({
      from: '"SuKaPab App" <no-reply@sukapab.com>',
      to: "supakorn6743@gmail.com",
      subject: "Confirm your email",
      html: `<p>Please confirm your email by clicking the link below:</p>
             <a href="${confirmURL}">Confirm Email</a>`,
    });

