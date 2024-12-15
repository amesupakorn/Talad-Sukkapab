import express from "express";
import ProductController from "../database/controllers/product/productControllers"
import multer from 'multer';


const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/products/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });
const upload = multer({ storage });

router.post("/create", upload.array('images', 10), ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById)


export default router