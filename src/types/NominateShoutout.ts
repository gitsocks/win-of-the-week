import { Nomination } from "@prisma/client";

export type NominateShoutout = Pick<Nomination, 'shoutoutId' | 'teamId'>;