import dotenv from "dotenv";
import nodemailer from "nodemailer";

const sendConfirmationEmail = async (email: string, token: string): Promise<void> => {

  try {
    dotenv.config();

    console.log("Loaded EMAIL_USER:", process.env.EMAIL_USER);
    console.log("Loaded EMAIL_PASS:", process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Connection Error:", error.message);
      } else {
        console.log("SMTP Connection Success:", success);
      }
    });

    const confirmURL = `http://localhost:5173/confirm-email?token=${token}`;

    await transporter.sendMail({
      from: `"SuKaPab App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm your email",
      html: `<p>Please confirm your email by clicking the link below:</p>
             <a href="${confirmURL}">Confirm Email</a>`,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

export default sendConfirmationEmail;