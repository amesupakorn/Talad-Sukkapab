// import { RequestHandler } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = "your_secret_key";

// const authMiddleware: RequestHandler = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     (req as any).user = decoded; // ใส่ข้อมูลผู้ใช้ที่ถอดรหัสแล้วเข้าไปใน req
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// export default authMiddleware;
