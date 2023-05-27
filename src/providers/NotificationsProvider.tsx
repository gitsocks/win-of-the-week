import { KnockFeedProvider } from "@knocklabs/react-notification-feed";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { PropsWithChildren } from "react";
import { ToastsProvider } from "./ToastsProvider";

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
    const { session } = useSessionContext();

    return (session ? (
        <KnockFeedProvider
            apiKey="pk_test_6slxJ42wfkBN0Gpd0AxECEuGjIo3VmWZ0M7zG2DM4co"
            feedId="a7144f7e-d792-40b6-b307-b5e151d78604"
            userId={session!.user.id}
        >
            <ToastsProvider>
                {children}
            </ToastsProvider>
        </KnockFeedProvider>
    ) : <>{children}</>
    );
};