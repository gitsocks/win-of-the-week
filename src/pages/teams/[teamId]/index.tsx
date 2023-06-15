import { ShoutoutCard } from "@/components/cards/ShoutoutCard/ShoutoutCard";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { SaturdaySelector } from "@/components/inputs/SaturdaySelector/SaturdaySelector";
import { MainLayout } from "@/components/layouts/MainLayout";
import { MembersList } from "@/components/lists/MembersList";
import { MembersModal } from "@/components/modals/MembersModal";
import { NewShoutoutModal } from "@/components/modals/NewShoutoutModal";
import { NextPageWithLayout } from "@/pages/_app";
import { useFetchTeamMembersQuery, useFetchTeamQuery, useFetchTeamShoutoutsQuery } from "@/services/team/team-queries";
import { ShoutoutWithUser } from "@/types/ShoutoutWithUser";
import { getWeekDates } from "@/utils/week";
import { Avatar, AvatarGroup, Box, Container, Flex, HStack, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Text, useBreakpointValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const TeamPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { teamId } = router.query;
    const { data: members, isLoading: isLoadingMembers } = useFetchTeamMembersQuery(teamId as string);
    const { weekNumber: initialWeekNumber, formattedEndOfWeek, formattedStartOfWeek } = getWeekDates();
    const [currentWeek, setCurrentWeek] = useState(initialWeekNumber);
    const [weekNumber, setWeekNumber] = useState(initialWeekNumber);
    const { data: shoutouts, isFetching } = useFetchTeamShoutoutsQuery(teamId as string, weekNumber);
    const [startOfWeek, setStartOfWeek] = useState('');
    const [endOfWeek, setEndOfWeek] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isSmallScreen = useBreakpointValue({ base: true, xl: false });

    const handleWeekChange = (newWeek: number) => {
        setWeekNumber(newWeek);
    };

    useEffect(() => {
        setWeekNumber(initialWeekNumber);
        setCurrentWeek(initialWeekNumber);
        setStartOfWeek(formattedStartOfWeek);
        setEndOfWeek(formattedEndOfWeek);
    }, []);

    useEffect(() => {
        const { formattedEndOfWeek: newEndOfWeek, formattedStartOfWeek: newStartOfWeek } = getWeekDates(weekNumber);
        setStartOfWeek(newEndOfWeek);
        setEndOfWeek(newStartOfWeek);
    }, [weekNumber]);

    const renderContent = () => (
        <Flex justifyContent="space-between" width="full" paddingX={5}>
            <Box width="full">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading size="lg">Shoutouts</Heading>
                    <AvatarGroup onClick={() => onOpen()} size='sm' max={2}>
                        {members && members.length > 0 && members.map((member: any) => (
                            <Avatar key={member.id} name={member.fullName} bgColor="teal" />
                        ))}
                    </AvatarGroup>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center" my={4}>
                    {isSmallScreen ? <Heading size="sx">{startOfWeek}</Heading> : <Heading size="sm">Week {weekNumber} | {startOfWeek} - {endOfWeek}</Heading>}
                    <SaturdaySelector weekNumber={weekNumber} onWeekChange={handleWeekChange} />
                </Flex>
                {shoutouts && shoutouts.length > 0 && shoutouts.map((shoutout: ShoutoutWithUser) => (
                    <ShoutoutCard key={shoutout.id} shoutout={shoutout} isFetching={isFetching} isDisabled={weekNumber !== currentWeek} />
                ))}
            </Box>
        </Flex>
    );

    return (
        <AuthGuard>
            {isSmallScreen ?
                renderContent()
                : (
                    <Container maxW="container.lg" mt={10}>
                        {renderContent()}
                    </Container>
                )
            }

            {members && <MembersModal isOpen={isOpen} onClose={onClose} members={members} teamId={teamId as string} />}
        </AuthGuard>
    );
};

TeamPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default TeamPage;