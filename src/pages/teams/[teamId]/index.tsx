import { ShoutoutCard } from "@/components/cards/ShoutoutCard/ShoutoutCard";
import { SaturdaySelector } from "@/components/inputs/SaturdaySelector/SaturdaySelector";
import { MainLayout } from "@/components/layouts/MainLayout";
import { MembersList } from "@/components/lists/MembersList";
import { NewShoutoutModal } from "@/components/modals/NewShoutoutModal";
import { NextPageWithLayout } from "@/pages/_app";
import { useFetchTeamQuery, useFetchTeamShoutoutsQuery } from "@/services/team/team-queries";
import { ShoutoutWithUser } from "@/types/ShoutoutWithUser";
import { getWeekDates } from "@/utils/week";
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, HStack, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const TeamPage: NextPageWithLayout = () => {
    const router = useRouter();
    const [showNewShoutoutModal, setShowNewShoutoutModal] = useState(false);
    const { teamId } = router.query;
    const { data: team, isLoading } = useFetchTeamQuery(teamId as string);
    const { weekNumber: initialWeekNumber, formattedEndOfWeek, formattedStartOfWeek } = getWeekDates();
    const [weekNumber, setWeekNumber] = useState(initialWeekNumber);
    const { data: shoutouts, isFetching } = useFetchTeamShoutoutsQuery(teamId as string, weekNumber);
    const [startOfWeek, setStartOfWeek] = useState('');
    const [endOfWeek, setEndOfWeek] = useState('');

    const handleWeekChange = (newWeek: number) => {
        setWeekNumber(newWeek);
    };

    useEffect(() => {
        setWeekNumber(initialWeekNumber);
        setStartOfWeek(formattedStartOfWeek);
        setEndOfWeek(formattedEndOfWeek);
    }, []);

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
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm">Week {weekNumber} | {startOfWeek} - {endOfWeek}</Heading>
                        <SaturdaySelector weekNumber={weekNumber} onWeekChange={handleWeekChange} />
                    </Flex>
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
                    {shoutouts && shoutouts.map((shoutout: ShoutoutWithUser) => (
                        <ShoutoutCard key={shoutout.id} shoutout={shoutout} isFetching={isFetching} />
                    ))}
                </Box>
                <MembersList />
            </Flex>
            <NewShoutoutModal isOpen={showNewShoutoutModal} onClose={() => setShowNewShoutoutModal(false)} />
        </>
    );
};

TeamPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default TeamPage;