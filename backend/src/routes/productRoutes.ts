import express from "express";
import multer from "multer";
import path from "path";
import ProductController from "../database/controllers/product/productControllers";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/products"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and GIF are allowed."));
    }
  },
});

// Routes
router.post("/", upload.array("images", 5), ProductController.createProduct); // Maximum 5 images
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", upload.array("images", 5), ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;