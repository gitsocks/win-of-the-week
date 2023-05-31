import prisma from "@/api/prisma";
import { Shoutout } from "@prisma/client";

export const createShoutout = async (shoutout: Shoutout) => {
    const createdShoutout = await prisma.shoutout.create({
        data: {
            userId: shoutout.userId,
            shoutout: shoutout.shoutout,
            teamId: shoutout.teamId,
            authorId: shoutout.authorId
        }
    });

    return createdShoutout;
};