import { useNotifications } from "@/api/notifications/notifications";
import prisma from "@/api/prisma";
import { getWeekDates } from "@/utils/week";
import { Nomination } from "@prisma/client";

export const nominateShoutout = async (nomination: Nomination) => {
  const { newNomination } = useNotifications();
  const { startOfWeek, endOfWeek } = getWeekDates();

  const userNominationsCount = await prisma.nomination.count({
    where: {
      userId: nomination.userId,
      teamId: nomination.teamId,
      dateCreated: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });

  if (userNominationsCount >= 3) {
    throw new Error(
      "User has already used up their 3 votes for the week in the team."
    );
  }

  nomination = await prisma.nomination.create({
    data: {
      shoutoutId: nomination.shoutoutId,
      teamId: nomination.teamId,
      userId: nomination.userId,
    },
  });

  const issuedByName = await prisma.user.findUnique({
    where: {
      id: nomination.userId,
    },
    select: {
      fullName: true,
    },
  });

  const shoutoutUser = await prisma.shoutout.findUnique({
    where: {
      id: nomination.shoutoutId,
    },
    select: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  newNomination([shoutoutUser?.user.id!], issuedByName?.fullName || "Someone");

  return nomination;
};
