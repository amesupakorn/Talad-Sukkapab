import express from "express";
import CategoryController from "../database/controllers/product/categoryControllers"
import multer from 'multer';
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, path.join(__dirname, "../uploads/categories")); // ที่เก็บไฟล์
    },
    filename: (req, file, cb) => {const uniqueName = `${Date.now()}-${file.originalname}`;cb(null, uniqueName); // ตั้งชื่อไฟล์
    },
  });
  
const upload = multer({ storage });

router.post("/", upload.single("image"), CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", upload.single("image"), CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;