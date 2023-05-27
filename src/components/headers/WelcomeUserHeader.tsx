import { useUserQuery } from "@/services/user/user-queries";
import { Heading, Skeleton, useToast } from "@chakra-ui/react";

interface WelcomeUserHeaderProps {
    id: string;
}

export const WelcomeUserHeader = ({ id }: WelcomeUserHeaderProps) => {
    const { data: user, isLoading, isError, error } = useUserQuery(id);
    const toast = useToast();

    if (isError) {
        return <>Something bad happened </>;
    }

    return (isLoading ? <Skeleton /> :
        <Heading>Welcome back, {user.fullName}!</Heading>
    );
};