import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (user: User) => {
    await prisma.user.create({
        data: user
    });
};