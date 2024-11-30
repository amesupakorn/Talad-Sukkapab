import prisma from "../prisma/prisma";

// User Service: จัดการ CRUD กับฐานข้อมูล
const UserService = {
  // Create a user
  async createUser(data: { name: string; email: string }) {
    return prisma.users.create({
      data,
    });
  },

  // Get all users
  async getAllUsers() {
    return prisma.users.findMany();
  },

  // Get user by ID
  async getUserById(userId: number) {
    return prisma.users.findUnique({
      where: { id: userId },
    });
  },

  // Update user
  async updateUser(userId: number, data: { name?: string; email?: string }) {
    return prisma.users.update({
      where: { id: userId },
      data,
    });
  },

  // Delete user
  async deleteUser(userId: number) {
    return prisma.users.delete({
      where: { id: userId },
    });
  },
};

export default UserService;
