
import { useQueryClient, useQuery } from "react-query";
import { useUserService } from "./user-service";

export const useUserQuery = (id: string) => {
    const { getUserById } = useUserService();
    return useQuery(['users', id], () => getUserById(id));
};