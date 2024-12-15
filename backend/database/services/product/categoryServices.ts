import prisma from "../../prisma/prisma";

interface CreateCategoryInput {
  name: string;
  description?: string;
  image?: string;
}

const CategoryService = {
  // Create a new category
  createCategory: async (data: CreateCategoryInput) => {
    const { name, description, image } = data;

    try {
      return await prisma.category.create({
        data: { name, description, image },
      });
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Failed to create category");
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      return await prisma.category.findMany({
        include: { products: true },
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  },

  // Get a category by ID
  getCategoryById: async (id: number) => {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: { products: true },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw new Error("Failed to fetch category");
    }
  },

  // Update a category
  updateCategory: async (id: number, data: Partial<CreateCategoryInput>) => {
    const { name, description, image } = data;

    try {
      return await prisma.category.update({
        where: { id },
        data: { name, description, image },
      });
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw new Error("Failed to update category");
    }
  },

  // Delete a category
  deleteCategory: async (id: number) => {
    try {
      return await prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw new Error("Failed to delete category");
    }
  },
};

export default CategoryService;