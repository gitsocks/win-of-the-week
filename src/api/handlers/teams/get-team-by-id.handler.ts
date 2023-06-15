import prisma from "@/api/prisma";

export const getTeamById = async (id: string) => {
    const team = await prisma.team.findUnique({
        where: {
            id: id
        },
        include: {
            users: true
        }
    });

    return team;
};
