import { useMutation, useQueries, useQueryClient } from "react-query";
import { useInviteService } from "./invite-service";
import { CreateInvite } from "@/types/CreateInvite";

export const useCreateInviteMutation = () => {
  const { createInvite } = useInviteService();

  return useMutation((invite: CreateInvite) => {
    return createInvite(invite);
  });
};

export const useAcceptInviteMutation = () => {
  const { acceptInvite } = useInviteService();
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => {
      return acceptInvite(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
};
