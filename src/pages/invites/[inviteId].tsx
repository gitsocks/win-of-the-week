import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useGetInviteQuery } from "@/services/invite/invite-queries";
import { Box, Button, Flex, Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AuthenticationModal } from "@/components/modals/AuthenticationModal";
import { useAcceptInviteMutation } from "@/services/invite/invite-mutations";
import { useEffect } from "react";

const InvitePage: NextPageWithLayout = () => {
    const { session } = useSessionContext();
    const router = useRouter();
    const { inviteId, accepted } = router.query;
    const { data: invite, isLoading: isLoadingInvite } = useGetInviteQuery(inviteId as string);
    const { data: acceptedTeamId, mutate: acceptInvite, isSuccess, isLoading: isLoadingAccept } = useAcceptInviteMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const userIsAlreadyInTeam = invite?.team.users.find((user: any) => user.id === session?.user.id);

    const navigateToTeam = () => {
        router.push({
            pathname: '/teams/[teamId]',
            query: {
                teamId: invite.team.id
            }
        });
    };

    const handleContinueClick = () => {
        if (!session?.user) {
            onOpen();
        } else {
            handleAcceptInvite();
        }
    };

    const handleAcceptInvite = () => {
        acceptInvite(invite.id);
    };

    const handleSuccessfullAccept = () => navigateToTeam();

    if (isSuccess) {
        handleSuccessfullAccept();
    }

    useEffect(() => {
        if ((accepted as string) === 'true' && invite) {
            handleAcceptInvite();
        }
    }, [accepted, invite]);

    if (userIsAlreadyInTeam) {
        return (
            <Flex height="90%" justifyContent="space-around" alignItems="center">
                <Box textAlign="center">
                    <Heading size="md">You are already a member of {invite.team.name}.</Heading>
                    <Button size="md" mt={2} onClick={navigateToTeam}>Go there now</Button>
                </Box>
            </Flex>
        );
    }

    return (
        <>
            <Flex height="90%" justifyContent="space-around" alignItems="center">
                {isLoadingInvite ? (
                    <Spinner />
                ) : (
                    <Box textAlign="center">
                        <Heading size="md">You are invited to {invite.team.name}.</Heading>
                        <Button onClick={handleContinueClick} size="md" mt={2}>{(isLoadingAccept || isLoadingInvite) ? <Spinner /> : 'Continue'}</Button>
                    </Box>
                )}
            </Flex>
            {invite && <AuthenticationModal isOpen={isOpen} redirectTo={`/invites/${invite.id}?accepted=true`} title="Sign in to join team" />}
        </>
    );
};

InvitePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default InvitePage;