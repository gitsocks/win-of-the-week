import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Input, Spinner, useBreakpointValue, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { SwitchThemeIconButton } from "../buttons/SwitchThemeIconButton";
import { AppBarMenu } from "../menus/AppBarMenu";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { PopoverNotificationCenter } from "@novu/notification-center";
import { NewShoutoutComponent } from "../shoutouts/NewShoutoutComponent/NewShoutoutComponent";
import { TeamSelector } from "../menus/TeamSelector";
import { NotificationsBellButton } from "../buttons/NotificationsBellButton";
import { useRef } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { MembersList } from "../lists/MembersList";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const AppBar = () => {
    const router = useRouter();
    const { session } = useSessionContext();
    const { colorMode } = useColorMode();
    const isSmallScreen = useBreakpointValue({ base: true, xl: false });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { teamId } = router.query;

    const supabase = createClientComponentClient();

    return (
        <>
            <Flex paddingY={isSmallScreen ? 2 : 4} paddingX={isSmallScreen ? 4 : 8} alignItems="center" justifyContent="space-between">
                {!isSmallScreen ? (
                    <>
                        <TeamSelector />
                        <NewShoutoutComponent />
                    </>
                ) : (
                    <IconButton variant="ghost" colorScheme="teal" onClick={onOpen} aria-label="Open Drawer" icon={<FiMenu />} />
                )}

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
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <TeamSelector />
                    </DrawerHeader>

                    <DrawerBody>
                        {teamId && (
                            <>
                                <Input placeholder='🔍 Search teammate' />
                                <MembersList teamId={teamId as string} />
                            </>
                        )}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button onClick={() => supabase.auth.signOut()} w="full" leftIcon={<FiLogOut />} colorScheme='teal'>Logout</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};