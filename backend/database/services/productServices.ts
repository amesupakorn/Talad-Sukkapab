import prisma from "../prisma/prisma";

interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  images: string[];
}

const ProductService = {
    createProduct: async (data: CreateProductInput) => {
        const { name, description, price, categoryId, images } = data;

        const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            categoryId,
        },
        });

        if (images.length > 0) {
        const imageRecords = images.map((url) => ({ url, productId: product.id }));
        await prisma.imageProduct.createMany({ data: imageRecords });
        }

        return prisma.product.findUnique({
        where: { id: product.id },
        include: { images: true },
        });
    },

    getProducts: async () => {
        return prisma.product.findMany({
            include: { images: true },
        });
    },
    

    getProductById: async(id: number) => {
        return prisma.product.findUnique({
        where: { id },
        include: { images: true },
        });
    },
};

export default ProductService;
