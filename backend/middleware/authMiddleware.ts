import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import prisma from '../database/prisma/prisma'; 

export const authenticateUser = (async (req, res, next) => {


    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // แยก Bearer token ออกจาก header

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!); // ตรวจสอบ JWT
        const user = await prisma.users.findUnique({
            where: { id: decoded.id }, // ดึง User จากฐานข้อมูลตาม ID ใน token
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // เพิ่ม user เข้าไปใน `req.user`
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
})as RequestHandler;


