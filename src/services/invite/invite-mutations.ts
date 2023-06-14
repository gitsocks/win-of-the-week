import { useMutation } from "react-query";
import { useInviteService } from "./invite-service";
import { CreateInvite } from "@/types/CreateInvite";

export const useCreateInviteMutation = () => {
  const { createInvite } = useInviteService();

  return useMutation((invite: CreateInvite) => {
    return createInvite(invite);
  });
};
