import prisma from "../prisma/prisma";
import { CustomError } from "../../types/customError";

const ProfileService = {
    getUserProfile: async (userId: number) => {
        const user = await prisma.users.findUnique({
          where: { id: userId },
          select: {
            id: true,
            username: true,
            email: true,
          },
        });
    
        if (!user) {
            const error = new Error("User not found") as CustomError;
            error.statusCode = 404;
            throw error;
        }
    
        return user;
      },
};

export default ProfileService;
