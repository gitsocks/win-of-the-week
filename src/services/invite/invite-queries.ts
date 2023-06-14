import { useQuery } from "react-query";
import { useInviteService } from "./invite-service";

export const useGetInviteQuery = (id: string) => {
  const { getInvite } = useInviteService();

  return useQuery(["invites", id], () => getInvite(id));
};
