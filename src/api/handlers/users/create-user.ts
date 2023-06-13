import prisma from "@/api/prisma";
import { User } from "@prisma/client";

export const createUser = async (user: User) => {
    await prisma.user.create({
        data: user
    });
};