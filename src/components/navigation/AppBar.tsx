import { Box, Button, Flex, Heading, IconButton, Spinner, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { SwitchThemeIconButton } from "../buttons/SwitchThemeIconButton";
import { AppBarMenu } from "../menus/AppBarMenu";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { NotificationBell, PopoverNotificationCenter } from "@novu/notification-center";
import { NewShoutoutComponent } from "../shoutouts/NewShoutoutComponent/NewShoutoutComponent";
import { TeamSelector } from "../menus/TeamSelector";
import { FiBell } from "react-icons/fi";
import { NotificationsBellButton } from "../buttons/NotificationsBellButton";

export const AppBar = () => {
    const router = useRouter();
    const { session } = useSessionContext();

    const { colorMode } = useColorMode();

    return (
        <Flex paddingY={4} paddingX={8} alignItems="center" justifyContent="space-between">
            <TeamSelector />
            <NewShoutoutComponent />
            <Flex alignItems="center">
                <SwitchThemeIconButton />
                {session ? (
                    <>
                        <PopoverNotificationCenter theme={{
                            dark: {
                                layout: {
                                    background: '#1a202c'
                                },
                                notificationItem: {
                                    unread: {
                                        background: 'teal'
                                    },
                                    read: {
                                        background: '#2d3748'
                                    }
                                }
                            }
                        }} colorScheme={colorMode}>
                            {({ unseenCount }) => <NotificationsBellButton unseenCount={unseenCount || 0} />}
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