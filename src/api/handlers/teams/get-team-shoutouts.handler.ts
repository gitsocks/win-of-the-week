import prisma from "@/api/prisma";
import { getWeekDates } from "@/utils/week";

export const getTeamShoutouts = async (teamId: string, weekNumber: number, userId?: string) => {
    const { startOfWeek, endOfWeek } = getWeekDates(weekNumber);

    const shoutouts = await prisma.shoutout.findMany({
        where: {
            teamId: teamId,
            dateCreated: {
                gte: startOfWeek,
                lte: endOfWeek
            }
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