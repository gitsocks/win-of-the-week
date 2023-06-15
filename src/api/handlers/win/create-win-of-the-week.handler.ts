import prisma from "@/api/prisma";
import { getWeekDates } from "@/utils/week";

export const createWinOfTheWeek = async (teamId: string) => {
  const { startOfWeek, endOfWeek } = getWeekDates();

  const shoutoutsRaw = await prisma.shoutout.findMany({
    where: {
      teamId: teamId,
      dateCreated: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    include: {
      user: {
        select: {
          fullName: true,
        },
      },
      nominations: {
        select: {
          userId: true,
        },
      },
    },
  });

  const shoutouts = shoutoutsRaw.map((shoutout) => ({
    id: shoutout.id,
    shoutout: shoutout.shoutout,
    nominationsCount: shoutout.nominations.length,
    user: shoutout.user.fullName,
  }));

  shoutouts.sort((a, b) => b.nominationsCount - a.nominationsCount);

  const winOfTheWeek = shoutouts[0];

  let nominations = [];

  if (shoutouts.length < 3) {
    nominations = shoutouts;
  } else {
    nominations = shoutouts.slice(0, 3);
  }

  try {
    await prisma.winOfTheWeek.create({
      data: {
        shoutoutId: winOfTheWeek.id,
      },
    });
  } catch {
    console.log("Win of the week is already saved");
  }

  return {
    winOfTheWeek: winOfTheWeek,
    nominations: nominations,
    shoutouts: shoutouts,
  };
};
