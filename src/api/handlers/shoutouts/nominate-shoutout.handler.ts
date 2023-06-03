import prisma from "@/api/prisma";
import { getWeekDates } from "@/utils/week";
import { Nomination } from "@prisma/client";

export const nominateShoutout = async (nomination: Nomination) => {
    const { startOfWeek, endOfWeek } = getWeekDates();

    const userNominationsCount = await prisma.nomination.count({
        where: {
            userId: nomination.userId,
            teamId: nomination.teamId,
            dateCreated: {
                gte: startOfWeek,
                lte: endOfWeek
            }
        }
    });

    if (userNominationsCount >= 3) {
        throw new Error('User has already used up their 3 votes for the week in the team.');
    }

    nomination = await prisma.nomination.create({
        data: {
            shoutoutId: nomination.shoutoutId,
            teamId: nomination.teamId,
            userId: nomination.userId
        }
    });

    return nomination;
};