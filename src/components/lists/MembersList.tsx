import { TeamMember } from "@/types/TeamMember";
import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Stack, StackDivider, Text, VStack, useColorModeValue } from "@chakra-ui/react";

interface MembersListProps {
    members: TeamMember[];
}

export const MembersList = ({ members }: MembersListProps) => {
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Card backgroundColor={formBackground} width="xs" shadow={0} height="fit-content">
            <CardHeader pb={0}>
                <Heading p={0} size="sm">Members</Heading>
            </CardHeader>
            <CardBody>
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