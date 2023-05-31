import prisma from "@/api/prisma";

export const getMembers = async (teamId: string, filter?: string) => {
    const members = await prisma.userTeam.findMany({
        where: {
            teamId
        },
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true
                }
            }
        }
    });

    return members
        .map(member => ({
            id: member.user.id,
            fullName: member.user.fullName
        }))
        .filter(member => filter ? member.fullName.includes(filter) : true);
};