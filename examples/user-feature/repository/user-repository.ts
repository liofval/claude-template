import type { CreateUserInput, User } from "../types/user";

// NOTE: prisma は実際のプロジェクトでは lib/prisma.ts 等から import する
// import { prisma } from "@/lib/prisma";

export const userRepository = {
  async findAll(page: number, perPage: number): Promise<User[]> {
    return prisma.user.findMany({
      take: perPage,
      skip: page * perPage,
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async create(input: CreateUserInput): Promise<User> {
    return prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        role: input.role ?? "member",
      },
    });
  },
};
