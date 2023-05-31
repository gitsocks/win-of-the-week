import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Stack, StackDivider, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export const MembersList = () => {
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Card backgroundColor={formBackground} width="xs" shadow={0}>
            <CardHeader pb={0}>
                <Heading p={0} size="md">Members</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing={4}>
                    <Flex alignItems="center">
                        <Avatar mr={2} size="sm" name="Billy Anderson" />
                        <Text>Billy Anderson</Text>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
};