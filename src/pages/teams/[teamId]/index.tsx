import { ShoutoutCard } from "@/components/cards/ShoutoutCard/ShoutoutCard";
import { SaturdaySelector } from "@/components/inputs/SaturdaySelector/SaturdaySelector";
import { MainLayout } from "@/components/layouts/MainLayout";
import { MembersList } from "@/components/lists/MembersList";
import { NewShoutoutModal } from "@/components/modals/NewShoutoutModal";
import { NextPageWithLayout } from "@/pages/_app";
import { useFetchTeamMembersQuery, useFetchTeamQuery, useFetchTeamShoutoutsQuery } from "@/services/team/team-queries";
import { ShoutoutWithUser } from "@/types/ShoutoutWithUser";
import { getWeekDates } from "@/utils/week";
import { Box, Card, CardBody, CardFooter, CardHeader, Container, Flex, HStack, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const TeamPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { teamId } = router.query;
    const { data: members, isLoading: isLoadingMembers } = useFetchTeamMembersQuery(teamId as string);
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



    return (
        <>
            {!isLoadingMembers && <MembersList members={members} />}
            <Flex justifyContent="space-between" width="full" paddingX={5}>
                <Box width="full">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="lg">Shoutouts</Heading>
                        <SaturdaySelector weekNumber={weekNumber} onWeekChange={handleWeekChange} />
                    </Flex>
                    <Heading size="sm">Week {weekNumber} | {startOfWeek} - {endOfWeek}</Heading>

                    {shoutouts && shoutouts.map((shoutout: ShoutoutWithUser) => (
                        <ShoutoutCard key={shoutout.id} shoutout={shoutout} isFetching={isFetching} />
                    ))}
                </Box>
            </Flex>
        </>
    );
};

TeamPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default TeamPage;