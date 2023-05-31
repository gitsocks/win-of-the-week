import { Box, Card, CardHeader, Heading, useColorModeValue } from "@chakra-ui/react";

export const SideBar = () => {
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Card backgroundColor={formBackground} width="xs" marginRight={5} shadow={0}>
            <CardHeader>
                <Heading size="md">SideNav</Heading>
            </CardHeader>
        </Card>
    );
};