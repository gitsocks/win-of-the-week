import prisma from "@/api/prisma";

export const getUserTeams = async (id: string) => {
  const userTeams = await prisma.userTeam.findMany({
    where: {
      userId: id,
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return userTeams.map((userTeam) => ({
    id: userTeam.team.id,
    name: userTeam.team.name,
  }));
};
