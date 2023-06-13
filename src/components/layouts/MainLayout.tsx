import { Box, Button, ChakraProvider, Container, Grid, GridItem, HStack, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { AppBar } from "../navigation/AppBar";
import { BaseLayout } from "./BaseLayout";
export const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <BaseLayout>
            <AppBar />
            <HStack padding="5" alignItems="top">
                {children}
            </HStack>
        </BaseLayout>
    );
};