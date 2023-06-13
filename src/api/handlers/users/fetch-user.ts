import prisma from "@/api/prisma";

export const fetchUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            teams: true
        }
    });

    return user;
};