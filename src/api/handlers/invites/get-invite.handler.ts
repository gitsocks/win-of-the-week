import prisma from "@/api/prisma";

export const getInvite = async (id: string) => {
  const invite = await prisma.invite.findUnique({
    where: {
      id: id,
    },
    include: {
      team: {
        include: {
          users: {
            select: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    id: invite?.id,
    team: {
      id: invite?.team.id,
      name: invite?.team.name,
      users: invite?.team.users.map((teamUser) => ({
        id: teamUser.user.id,
      })),
    },
  };
};
