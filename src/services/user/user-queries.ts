import { useQuery } from "react-query";
import { useUserService } from "./user-service";

export const useUserQuery = (id: string) => {
  const { getUserById } = useUserService();
  return useQuery(["users", id], () => getUserById(id));
};

export const useCurrentUserQuery = () => {
  const { getCurrentUser } = useUserService();
  return useQuery(["users", "current"], () => getCurrentUser());
};

export const useFetchUserTeamsQuery = (id: string = "") => {
  const { getUserTeams } = useUserService();
  return useQuery(["users", id, "teams"], () => getUserTeams(id));
};
