import prisma from "@/api/prisma";
import { getInvite } from "./get-invite.handler";

export const acceptInvite = async (userId: string, inviteId: string) => {
  const invite = await getInvite(inviteId);
  const teamId = invite.team.id;

  if (!teamId) {
    throw new Error(
      "No team is attached to this invite or an invalid team id exists.",
      {
        cause: invite,
      }
    );
  }

  const result = await prisma.userTeam.create({
    data: {
      userId: userId,
      teamId: teamId,
    },
  });

  return result.teamId;
};
