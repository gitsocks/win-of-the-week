import { Box, Button, ChakraProvider, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { AppBar } from "../navigation/AppBar";
import { BaseLayout } from "./BaseLayout";

export const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <BaseLayout>
            <AppBar />
            <Box padding={4}>
                {children}
            </Box>
        </BaseLayout>
    );
};