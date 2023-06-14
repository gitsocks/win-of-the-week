import { CreateInvite } from "@/types/CreateInvite";

export const useInviteService = () => {
  const createInvite = async (invite: CreateInvite) => {
    const response = await fetch(`/api/invites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invite),
    });

    return response.json();
  };

  return { createInvite };
};
