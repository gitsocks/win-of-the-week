import { useSessionContext } from "@supabase/auth-helpers-react";
import { PropsWithChildren } from "react";
import { ToastsProvider } from "./ToastsProvider";
import { NovuProvider } from "@novu/notification-center";

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
    const { session } = useSessionContext();

    return (session ? (
        <NovuProvider subscriberId={session.user.id} applicationIdentifier="wH1SPc0hQxSe">
            <ToastsProvider>
                {children}
            </ToastsProvider>
        </NovuProvider>
    ) : <>{children}</>
    );
};