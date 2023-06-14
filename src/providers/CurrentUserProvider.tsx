import { useCurrentUserQuery } from "@/services/user/user-queries";
import { PropsWithChildren } from "react";

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const { data: currentUser } = useCurrentUserQuery();

    console.log('CurrentUser', currentUser);

    return (
        <>{children}</>
    );
};