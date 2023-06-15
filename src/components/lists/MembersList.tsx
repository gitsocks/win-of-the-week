import { useCreateInviteMutation } from "@/services/invite/invite-mutations";
import { useFetchTeamMembersQuery } from "@/services/team/team-queries";
import { TeamMember } from "@/types/TeamMember";
import { Avatar, Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Spinner, Stack, StackDivider, Text, VStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

interface MembersListProps {
    teamId: string;
}

export const MembersList = ({ teamId }: MembersListProps) => {
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const { data: invite, isSuccess, isError, mutate: createInvite } = useCreateInviteMutation();
    const { data: members, isLoading: isLoadingMembers } = useFetchTeamMembersQuery(teamId as string);
    const toast = useToast();

    const copyToClipboard = async () => await navigator.clipboard.writeText(invite.link);

    const handleInviteClick = async () => {
        createInvite({ teamId: teamId });
    };



    useEffect(() => {
        if (isSuccess) {
            copyToClipboard();
            toast({
                status: 'success',
                title: 'The link has been copied!',
            });
        }

        if (isError) {
            toast({
                status: 'error',
                title: 'Something went wrong 🥲.',
            });
        }
    }, [isSuccess]);

    return (
        <Card p={0} backgroundColor={formBackground} shadow={0} height="fit-content">
            <CardBody p={0} my={4}>
                <Button onClick={handleInviteClick} width="full" mb={4}>Invite to Team</Button>
                <Divider mb={4} />
                {isLoadingMembers ? (
                    <Flex justifyContent="space-around" alignItems="center">
                        <Spinner />
                    </Flex>
                ) : (
                    <Stack divider={<StackDivider />} spacing={4}>
                        {members && members.length > 0 && members.map((member: TeamMember) => (
                            <Flex key={member.id} alignItems="center">
                                <Avatar mr={2} size="sm" name={member.fullName} />
                                <Text>{member.fullName}</Text>
                            </Flex>
                        ))}
                    </Stack>
                )}
            </CardBody>
        </Card >
    );
};