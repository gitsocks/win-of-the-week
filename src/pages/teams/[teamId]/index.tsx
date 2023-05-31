import { MainLayout } from "@/components/layouts/MainLayout";
import { MembersList } from "@/components/lists/MembersList";
import { NewShoutoutModal } from "@/components/modals/NewShoutoutModal";
import { SideBar } from "@/components/navigation/SideBar";
import { NextPageWithLayout } from "@/pages/_app";
import { useFetchTeamQuery } from "@/services/team/team-queries";
import { getCurrentWeek } from "@/utils/week";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Flex, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

const TeamPage: NextPageWithLayout = () => {
    const router = useRouter();
    const [showNewShoutoutModal, setShowNewShoutoutModal] = useState(false);
    const { teamId } = router.query;
    const { data: team, isLoading } = useFetchTeamQuery(teamId as string);
    const { startOfTheWeek, endOfTheWeek, weekNumber } = getCurrentWeek();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === ' ' && event.ctrlKey) {
                setShowNewShoutoutModal(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <Flex justifyContent="space-between" width="full">
                <Box width="full" paddingRight={5}>
                    <Heading>{isLoading ? 'Loading ...' : team.name}</Heading>
                    <Heading size="sm">Week {weekNumber} | {startOfTheWeek} - {endOfTheWeek}</Heading>

                    <Card onClick={() => setShowNewShoutoutModal(true)} mt={4}>
                        <CardBody padding={3}>
                            <Flex justifyContent="space-between">
                                <Flex>
                                    <Text mr={5}>📢</Text>
                                    <Text color="gray.400">Post a new shoutout</Text>
                                </Flex>
                                <Flex>
                                    <Kbd>Ctrl</Kbd>+<Kbd>Space</Kbd>
                                </Flex>
                            </Flex>
                        </CardBody>
                    </Card>
                </Box>
                <MembersList />
            </Flex>
            <NewShoutoutModal isOpen={showNewShoutoutModal} onClose={() => setShowNewShoutoutModal(false)} />
        </>
    );
};

TeamPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default TeamPage;