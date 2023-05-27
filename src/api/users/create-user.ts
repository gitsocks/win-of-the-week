import { User } from "@prisma/client";
import prisma from '../prisma';

export const createUser = async (user: User) => {
    await prisma.user.create({
        data: user
    });
};