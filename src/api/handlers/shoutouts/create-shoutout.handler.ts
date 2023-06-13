import prisma from "@/api/prisma";
import { Shoutout } from "@prisma/client";
import { Novu } from "@novu/node";

export const createShoutout = async (shoutout: Shoutout) => {
  const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY!);

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

  const issuedByName = team?.users.find(
    (user) => user.user.id == shoutout.authorId
  )?.user.fullName;

  const issuedToName = team?.users.find(
    (user) => user.user.id == shoutout.userId
  )?.user.fullName;

  team?.users
    .filter((user) => user.userId !== shoutout.authorId)
    .forEach((user) =>
      novu.trigger("new-shoutout", {
        to: {
          subscriberId: user.user.id,
        },
        payload: {
          issuedByName: issuedByName,
          issuedToName: issuedToName,
          shoutoutId: shoutout.id,
        },
      })
    );

  return createdShoutout;
};
