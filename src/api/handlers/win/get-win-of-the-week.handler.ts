import prisma from "@/api/prisma";
import { getWeekDates } from "@/utils/week";

export const getWinOfTheWeek = async (teamId: string) => {
  const { startOfWeek, endOfWeek } = getWeekDates();
  const winOfTheWeek = await prisma.winOfTheWeek.findFirst({
    where: {
      shoutout: {
        teamId: teamId,
      },
      dateCreated: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });

  return winOfTheWeek;
};
