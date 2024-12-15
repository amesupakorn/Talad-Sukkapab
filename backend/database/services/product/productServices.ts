import prisma from "../../prisma/prisma";

interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  images: string[];
}

const ProductService = {
  // Create a new product with associated images
  createProduct: async (data: CreateProductInput) => {
    const { name, description, price, categoryId, images } = data;

    try {
      // Create the product
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          categoryId,
        },
      });

      // Create associated image records
      if (images.length > 0) {
        const imageRecords = images.map((url) => ({ url, productId: product.id }));
        await prisma.imageProduct.createMany({ data: imageRecords });
      }

      // Return the product with images
      return await prisma.product.findUnique({
        where: { id: product.id },
        include: { images: true },
      });
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  },

  // Fetch all products with their images
  getProducts: async () => {
    try {
      return await prisma.product.findMany({
        include: { images: true },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  // Fetch a product by its ID with images
  getProductById: async (id: number) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { images: true },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw new Error("Failed to fetch product");
    }
  },

  // Update a product and its associated images
  updateProduct: async (
    id: number,
    data: Partial<CreateProductInput>
  ) => {
    const { name, description, price, categoryId, images } = data;

    try {
      // Update the product
      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          categoryId,
        },
      });

      // Update or replace associated images
      if (images) {
        // Delete old images
        await prisma.imageProduct.deleteMany({
          where: { productId: id },
        });

        // Add new images
        const imageRecords = images.map((url) => ({ url, productId: id }));
        await prisma.imageProduct.createMany({ data: imageRecords });
      }

      // Return the updated product with images
      return await prisma.product.findUnique({
        where: { id },
        include: { images: true },
      });
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw new Error("Failed to update product");
    }
  },

  // Delete a product and its associated images
  deleteProduct: async (id: number) => {
    try {
      // Delete associated images first
      await prisma.imageProduct.deleteMany({
        where: { productId: id },
      });

      // Delete the product
      return await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw new Error("Failed to delete product");
    }
  },
};

export default ProductService;