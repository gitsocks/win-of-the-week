import { Team } from "@/models/team";

export interface ExampleTeam {
    name: string;
}

export const useTeamService = () => {
    const createTeam = async (team: ExampleTeam) => {
        const data = { name: team.name };
        console.log(team.name);
        const response = await fetch(`/api/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log('CreateTeamResponse', response);

        return response.body;
    };

    return {
        createTeam
    };
};