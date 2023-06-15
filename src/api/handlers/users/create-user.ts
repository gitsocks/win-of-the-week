import { useNotifications } from "@/api/notifications/notifications";
import prisma from "@/api/prisma";
import { User } from "@prisma/client";

export const createUser = async (user: User, email: string) => {
  const { createSubscriber } = useNotifications();

  const newUser = await prisma.user.create({
    data: user,
  });

  await createSubscriber(newUser.id, newUser.fullName, email);
};
