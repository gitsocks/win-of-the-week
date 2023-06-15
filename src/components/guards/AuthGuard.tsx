import { Spinner } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const { session, isLoading } = useSessionContext();

    const navigateToLogin = () => {
        router.push('/auth/login');

    };
    if (isLoading) {
        return <Spinner />;
    } else if (!session?.user.id) {
        navigateToLogin();
        return null;
    } else {
        return <>{children}</>;
    }
};