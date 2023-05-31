import { Team } from "@/models/team";

export const useTeamService = () => {
    const fetchTeam = async (id: string) => {
        const response = await fetch(`/api/teams/${id}`);

        if (response.status == 404) {
            throw new Error('Team not found');
        }

        return response.json();
    };

    const fetchMembers = async (id: string, filter?: string) => {
        const response = await fetch(`/api/teams/${id}/members?filter=${filter}`);
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
        createTeam
    };
};