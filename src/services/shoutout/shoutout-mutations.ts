import { useMutation, useQueryClient } from "react-query";
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
    const queryClient = useQueryClient();

    return useMutation((nomination: NominateShoutout) => {
        return nominateShoutout(nomination);
    }, {
        onSettled: () => {
            queryClient.invalidateQueries();
        }
    });
};