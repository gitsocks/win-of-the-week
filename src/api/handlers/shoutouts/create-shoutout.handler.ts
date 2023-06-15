import { useNotifications } from "@/api/notifications/notifications";
import prisma from "@/api/prisma";
import { Shoutout } from "@prisma/client";

export const createShoutout = async (shoutout: Shoutout) => {
  const { newShoutout } = useNotifications();

  const createdShoutout = await prisma.shoutout.create({
    data: {
      userId: shoutout.userId,
      shoutout: shoutout.shoutout,
      teamId: shoutout.teamId,
      authorId: shoutout.authorId,
    },
  });

  const team = await prisma.team.findUnique({
    where: {
      id: shoutout.teamId,
    },
    include: {
      users: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      },
    },
  });

  const issuedByName =
    team?.users.find((user) => user.user.id == shoutout.authorId)?.user
      .fullName || "Someone";

  const issuedToName =
    team?.users.find((user) => user.user.id == shoutout.userId)?.user
      .fullName || "Someone else";

  const recipients =
    team?.users
      .filter((user) => user.userId !== shoutout.authorId)
      .map((user) => user.userId) || [];

  newShoutout(recipients, issuedByName, issuedToName, shoutout.id);

  return createdShoutout;
};
