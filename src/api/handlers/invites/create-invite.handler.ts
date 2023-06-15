import { CreateInviteDto } from "@/api/dtos/create-invite.dto";
import prisma from "@/api/prisma";

export const createInvite = async (invite: CreateInviteDto) => {
  const result = await prisma.invite.create({
    data: {
      userId: invite.userId,
      teamId: invite.teamId,
    },
  });

  return result;
};
