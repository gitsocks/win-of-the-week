import { Shoutout } from "@prisma/client";

export type ShoutoutWithUser = Shoutout & {
    user: {
        fullName: string;
    };
    nominations: {
        userId: string;
    }[];
};