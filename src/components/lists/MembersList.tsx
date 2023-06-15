import { useCreateInviteMutation } from "@/services/invite/invite-mutations";
import { TeamMember } from "@/types/TeamMember";
import { Avatar, Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Stack, StackDivider, Text, VStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

interface MembersListProps {
    teamId: string;
    members: TeamMember[];
}

export const MembersList = ({ members, teamId }: MembersListProps) => {
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const { data: invite, isSuccess, isError, mutate: createInvite } = useCreateInviteMutation();
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
        <Card backgroundColor={formBackground} shadow={0} height="fit-content">
            <CardBody>
                <Button onClick={handleInviteClick} width="full" mb={4}>Invite to Team</Button>
                <Divider mb={4} />
                <Stack divider={<StackDivider />} spacing={4}>
                    {members && members.map(member => (
                        <Flex key={member.id} alignItems="center">
                            <Avatar mr={2} size="sm" name={member.fullName} />
                            <Text>{member.fullName}</Text>
                        </Flex>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
};