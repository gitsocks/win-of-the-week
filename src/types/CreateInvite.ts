import { Invite } from "@prisma/client";

export type CreateInvite = Pick<Invite, "teamId">;
