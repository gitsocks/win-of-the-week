import { useUserQuery } from "@/services/user/user-queries";
import { Spinner } from "@chakra-ui/react";
import { Session, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

interface AppGuardProps {
    session: Session;
}

export const AppGuard = ({ session }: AppGuardProps) => {
    const { data: user, isLoading } = useUserQuery(session.user.id);
    const router = useRouter();

    if (isLoading) {
        return <Spinner />;
    } else if (!user) {
        router.push('/auth/login');
    } else if (!user.teams || user.teams.length == 0) {
        router.push('/teams/create');
    } else {
        const firstTeam = user.teams[0];
        console.log('AppGuard', firstTeam);
        router.push({
            pathname: '/teams/[teamId]',
            query: {
                teamId: firstTeam.teamId
            }
        });
    }

    return null;
};