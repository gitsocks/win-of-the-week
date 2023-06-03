import { useMutation } from "react-query";
import { useShoutoutService } from "./shoutout-service";
import { CreateShoutout } from "@/types/CreateShoutout";
import { NominateShoutout } from "@/types/NominateShoutout";

export const useCreateShoutoutMutation = () => {
    const { createShoutout } = useShoutoutService();

    return useMutation((shoutout: CreateShoutout) => {
        return createShoutout(shoutout);
    });
};

export const useNominateShoutoutMutation = () => {
    const { nominateShoutout } = useShoutoutService();

    return useMutation((nomination: NominateShoutout) => {
        return nominateShoutout(nomination);
    });
};