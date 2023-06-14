import { Box, Button, ChakraProvider, Container, Grid, GridItem, HStack, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { AppBar } from "../navigation/AppBar";
import { BaseLayout } from "./BaseLayout";
import { CreateWinOfTheWeekModal } from "../modals/CreateWinOfTheWeekModal";
import { useRouter } from "next/router";
export const MainLayout = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const { teamId } = router.query;

    return (
        <BaseLayout>
            <AppBar />
            <HStack padding="4" alignItems="top">
                {children}
            </HStack>
            {teamId && <CreateWinOfTheWeekModal teamId={teamId as string} />}
        </BaseLayout>
    );
};