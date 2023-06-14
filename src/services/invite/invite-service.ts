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

  const getInvite = async (id: string) => {
    const response = await fetch(`/api/invites/${id}`);
    return response.json();
  };

  const acceptInvite = async (id: string) => {
    const response = await fetch(`/api/invites/${id}/accept`, {
      method: "POST",
    });

    return response.json();
  };

  return { createInvite, getInvite, acceptInvite };
};
