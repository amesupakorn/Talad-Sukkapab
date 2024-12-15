import { RequestHandler } from "express";
import CategoryService from "../../services/product/categoryServices";

const CategoryController = {
  // Create a category
  createCategory: (async (req, res) => {
    try {
      const { name, description } = req.body;
      const image = req.file ? `/uploads/categories/${req.file.filename}` : undefined;

      const category = await CategoryService.createCategory({
        name,
        description,
        image,
      });

      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create category" });
    }
  }) as RequestHandler,

  // Get all categories
  getCategories: (async (req, res) => {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }) as RequestHandler,

  // Get a category by ID
  getCategoryById: ( async (req, res) => {
    try {
      const { id } = req.params;

      const category = await CategoryService.getCategoryById(Number(id));
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Category not found" });
    }
  })as RequestHandler,

  // Update a category
  updateCategory: (async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const image = req.file ? req.file.filename : undefined; // Path ของไฟล์ที่อัปโหลด (optional)

      const updatedCategory = await CategoryService.updateCategory(Number(id), {
        name,
        description,
        image,
      });

      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update category" });
    }
  }) as RequestHandler,

  // Delete a category
  deleteCategory: (async (req, res) => {
    try {
      const { id } = req.params;

      await CategoryService.deleteCategory(Number(id));
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  }) as RequestHandler,
};

export default CategoryController;