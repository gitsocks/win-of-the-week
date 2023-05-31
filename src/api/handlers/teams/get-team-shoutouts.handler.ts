import prisma from "@/api/prisma";

export const getTeamShoutouts = async (teamId: string, userId?: string) => {
    const shoutouts = await prisma.shoutout.findMany({
        where: {
            teamId: teamId
        },
        include: {
            user: {
                select: {
                    fullName: true
                }
            }
        }
    });

    return shoutouts;
};