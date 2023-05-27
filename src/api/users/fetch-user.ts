import prisma from '../prisma';

export const fetchUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    return user;
};