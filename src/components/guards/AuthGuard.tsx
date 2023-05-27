import { Spinner } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const { session, isLoading } = useSessionContext();

    useEffect(() => {
        if (!isLoading && !session) {
            router.push('/auth/login');
        }
    }, [session]);

    return (
        isLoading ? <Spinner /> : <>{children}</>
    );
};