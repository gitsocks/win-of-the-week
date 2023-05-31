import { useQuery } from "react-query";
import { useTeamService } from "./team-service";

export const useFetchTeamQuery = (id: string) => {
    const { fetchTeam } = useTeamService();

    return useQuery(['teams', id], () => fetchTeam(id));
};

export const useFetchTeamMembersQuery = (id: string, filter?: string) => {
    const { fetchMembers } = useTeamService();

    return useQuery(['teams', id, 'members', filter], () => fetchMembers(id, filter));
};

export const useFetchTeamShoutoutsQuery = (id: string, filter?: string) => {
    const { fetchShoutouts } = useTeamService();
    return useQuery(['teams', id, 'shoutouts', filter], () => fetchShoutouts(id, filter));
};