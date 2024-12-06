import prisma from "../prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../../types/customError";
import crypto from "crypto";
import sendConfirmationEmail from "./emailService";
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;

const AuthService = {
  signUp: async ({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (password !== confirmPassword) {
      const error = new Error("Password and confirm password do not match") as CustomError;
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    const existName = await prisma.users.findUnique({ where: { username } });

    if (existName) {
      const error = new Error("Username is already in use") as CustomError;
      error.statusCode = 400;
      throw error;
    }
    if (existingUser) {
      const error = new Error("Email is already in use") as CustomError;
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const emailConfirmationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        emailConfirmationToken,
      },
    });

    await sendConfirmationEmail(email, emailConfirmationToken);
    return { message: "User registered successfully. Please check your email to confirm your account." };


  },

  confirmEmail: async (token: string) => {
    const user = await prisma.users.findUnique({ where: { emailConfirmationToken: token } });

    if (!user) {
      const error = new Error("Invalid or expired token") as CustomError;
      error.statusCode = 400;
      throw error;
    }

    await prisma.users.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailConfirmationToken: null, // ลบ token หลังยืนยันสำเร็จ
      },
    });

    return { message: "Email confirmed successfully" };
  },

  signIn: async ({ email, password }: { email: string; password: string }) => {
    // ตรวจสอบว่าผู้ใช้งานมีอยู่ในฐานข้อมูลหรือไม่
  
    const user = await prisma.users.findUnique({ where: { email } });


    if (!user) {
      const error = new Error("Invalid email or password") as CustomError;
      error.statusCode = 401;
      throw error;
    }
  
    // ตรวจสอบว่าอีเมลได้รับการยืนยันแล้วหรือไม่
    if (!user.isEmailVerified) {
      const error = new Error("Email has not been verified") as CustomError;
      error.statusCode = 403; 
      throw error;
    }
  
    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password") as CustomError;
      error.statusCode = 401;
      throw error;
    }
  
    // สร้าง JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  
    return { token, user };
  },

    
};

export default AuthService;
