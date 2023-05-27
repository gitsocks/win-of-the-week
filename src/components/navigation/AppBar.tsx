import { Box, Button, Flex, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";

export const AppBar = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const boxBackgroundColor = useColorModeValue("teal.300", "teal.600");
    return (
        <Flex paddingY={2} paddingX={4} alignItems="center" justifyContent="space-between" backgroundColor={boxBackgroundColor}>
            <Heading size="md">Win of the Week</Heading>
            <Button onClick={toggleColorMode}>{colorMode}</Button>
        </Flex>
    );
};