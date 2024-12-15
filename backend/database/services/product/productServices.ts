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
};

export default ProductService;