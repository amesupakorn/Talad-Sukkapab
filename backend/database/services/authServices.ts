import prisma from "../prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../../types/customError";
import crypto from "crypto";

const JWT_SECRET = crypto.randomBytes(64).toString("hex");

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
    // ตรวจสอบว่า password และ confirmPassword ตรงกัน
    if (password !== confirmPassword) {
      const error = new Error("Password and confirm password do not match") as CustomError;
      error.statusCode = 400;
      throw error;
    }

    // ตรวจสอบว่า email ซ้ำหรือไม่
    const existingUser = await prisma.users.findUnique({ where: { email } });
    const existName = await prisma.users.findUnique({ where: { username }});

    if (existName){
      const error = new Error("Username is already in use") as CustomError;
      error.statusCode = 400;
      throw error;
    }
    if (existingUser) {
      const error = new Error("Email is already in use") as CustomError;
      error.statusCode = 400;
      throw error;
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return user;
  },

  signIn: async ({ email, password }: { email: string; password: string }) => {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      const error = new Error("Invalid email or password") as CustomError;
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password") as CustomError;
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    return { token, user };
  },
};

export default AuthService;
