import prisma from "@/api/prisma";
import { CurrentUser } from "@/types/CurrentUser";

export const getCurrentUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            teams: {
                include: {
                    team: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });

    return user;
};