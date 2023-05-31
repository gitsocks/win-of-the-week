import { useMutation } from "react-query";
import { useShoutoutService } from "./shoutout-service";
import { Shoutout } from "@prisma/client";
import { CreateShoutout } from "@/types/CreateShoutout";

export const useCreateShoutoutMutation = () => {
    const { createShoutout } = useShoutoutService();

    return useMutation((shoutout: CreateShoutout) => {
        return createShoutout(shoutout);
    });
};