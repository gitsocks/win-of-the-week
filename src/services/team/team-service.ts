import { Team } from "@/models/team";

export const useTeamService = () => {
  const fetchTeam = async (id: string) => {
    const response = await fetch(`/api/teams/${id}`);
    return response.json();
  };

  const fetchMembers = async (id: string, filter?: string) => {
    const url =
      filter === "undefined" || filter === undefined
        ? `/api/teams/${id}/members`
        : `/api/teams/${id}/members?filter=${filter}`;

    const response = await fetch(url);
    return response.json();
  };

  const fetchShoutouts = async (
    id: string,
    weekNumber: number,
    filter?: string
  ) => {
    const response = await fetch(
      `/api/teams/${id}/shoutouts?weekNumber=${weekNumber}&userId=${filter}`
    );
    return response.json();
  };

  const createTeam = async (team: Team) => {
    const data = { name: team.name };
    const response = await fetch(`/api/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  return {
    fetchTeam,
    fetchMembers,
    fetchShoutouts,
    createTeam,
  };
};
