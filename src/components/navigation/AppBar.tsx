import { Box, Button, Flex, Heading, IconButton, Spinner, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { SwitchThemeIconButton } from "../buttons/SwitchThemeIconButton";
import { AppBarMenu } from "../menus/AppBarMenu";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { NotificationBell, PopoverNotificationCenter } from "@novu/notification-center";

export const AppBar = () => {
    const router = useRouter();
    const { session } = useSessionContext();
    const boxBackgroundColor = useColorModeValue("teal.300", "teal.600");
    const { colorMode } = useColorMode();
    const handleSignOutClick = () => {

    };

    return (
        <Flex paddingY={2} paddingX={4} alignItems="center" justifyContent="space-between" backgroundColor={boxBackgroundColor}>
            <Heading size="md">Win of the Week</Heading>
            <Flex alignItems="center">
                <SwitchThemeIconButton />
                {session ? (
                    <>
                        <PopoverNotificationCenter colorScheme={colorMode}>
                            {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                        </PopoverNotificationCenter>
                        <AppBarMenu />
                    </>
                ) : (
                    <Flex>
                        <Button colorScheme="teal" variant="solid" onClick={() => router.push('/auth/login')}>Login</Button>
                        <Button colorScheme="teal" variant="outline" onClick={() => router.push('/auth/register')}>Register</Button>
                    </Flex>
                )}

            </Flex>
        </Flex>
    );
};