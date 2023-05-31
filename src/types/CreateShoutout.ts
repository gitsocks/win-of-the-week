import { Shoutout } from "@prisma/client";

export type CreateShoutout = Pick<Shoutout, 'shoutout' | 'teamId' | 'userId'>;