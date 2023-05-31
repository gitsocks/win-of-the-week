import { Team } from "@/models/team";
import { useMutation } from "react-query";
import { useTeamService } from "./team-service";

export const useCreateTeamMutation = () => {
    const { createTeam } = useTeamService();

    return useMutation((team: Team) => {
        return createTeam(team);
    });
};