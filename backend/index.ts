import express, { Request, Response } from 'express';
import cors from "cors";

import productRoutes from "./routes/productRoutes"
import authRoutes from "./routes/authRoutes"
import dotenv from 'dotenv';
import Middleware from './middleware/authMiddleware';
import path from "path";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE", "PUT"], 
    credentials: true, 
  }));

app.use(express.json());  


app.get('/', (req: Request, res: Response) => {  
    res.send('Hello!');
});

app.use("/productImage", express.static(path.join(__dirname, "./uploads/products")));

app.use("/auth", authRoutes);
app.use("/products", productRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

