
import { useQueryClient, useQuery } from "react-query";
import { useUserService } from "./user-service";
import { useSession } from "@supabase/auth-helpers-react";

export const useUserQuery = (id: string) => {
    const { getUserById } = useUserService();
    return useQuery(['users', id], () => getUserById(id));
};

export const useCurrentUserQuery = () => {
    const session = useSession();
    if (!session) {
        throw new Error('No session exists.');
    }
    return useUserQuery(session.user.id);
};