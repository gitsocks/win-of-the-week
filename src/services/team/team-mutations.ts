import { Team } from "@/models/team";
import { useMutation, useQueryClient } from "react-query";
import { useTeamService } from "./team-service";

export const useCreateTeamMutation = () => {
  const { createTeam } = useTeamService();

  return useMutation((team: Team) => {
    return createTeam(team);
  });
};

export const useCreateWinOfTheWeekMutation = () => {
  const { createWinOfTheWeek } = useTeamService();
  const queryClient = useQueryClient();

  return useMutation(
    (teamId: string) => {
      return createWinOfTheWeek(teamId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
};
