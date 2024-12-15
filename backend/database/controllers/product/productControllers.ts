import { RequestHandler } from "express";
import ProductService from "../../services/product/productServices";


const ProductController = {
    
  // สร้าง Product พร้อมรูปภาพ
  createProduct: (async (req, res) => {
    try {
      const { name, description, price, categoryId } = req.body;

      const images = req.files 
        ? (req.files as Express.Multer.File[]).map((file) => `/uploads/products/${file.filename}`)
        : []; // Path รูปภาพ

      const product = await ProductService.createProduct({
        name,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        images,
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  }) as RequestHandler,

  // ดึง Product ทั้งหมด
  getProducts: (async (req, res) => {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  }) as RequestHandler,

  // ดึง Product ด้วย ID
  getProductById: (async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(parseInt(id));

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  }) as RequestHandler,
};

export default ProductController;
