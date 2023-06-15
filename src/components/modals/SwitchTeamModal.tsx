import { useFetchUserTeamsQuery } from "@/services/user/user-queries";
import { Box, Button, Text, Card, CardBody, Flex, Heading, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FiAlignCenter, FiHash } from "react-icons/fi";

interface SwitchTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SwitchTeamModal = ({ isOpen, onClose }: SwitchTeamModalProps) => {
    const { session } = useSessionContext();
    const router = useRouter();
    const { teamId } = router.query;
    const { data: userTeams, isLoading } = useFetchUserTeamsQuery(session?.user.id || '');

    const handleTeamSwitch = (switchToTeamId: string) => {
        router.push({
            pathname: '/teams/[teamId]',
            query: { teamId: switchToTeamId }
        });

        onClose();
    };

    const userHasOtherTeams = userTeams && userTeams.length > 0 && userTeams.filter((team: any) => team.id !== teamId).length > 0;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Switch Team</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <Spinner size="lg" />
                    ) : (
                        <Stack spacing='4'>
                            {userTeams && userTeams.length > 0 && userHasOtherTeams ? (
                                userTeams
                                    .filter((team: any) => team.id !== teamId)
                                    .map((team: any) => (
                                        <Button key={team.id} onClick={() => handleTeamSwitch(team.id)} leftIcon={<FiHash />} justifyContent="start" size="lg">{team.name}</Button>
                                    ))) : (
                                <Flex justifyContent="space-around" alignItems="center">
                                    <Heading size="sm" fontWeight="light">👍 There are no other teams.</Heading>
                                </Flex>
                            )}
                        </Stack>
                    )}
                </ModalBody>
                <ModalFooter />
            </ModalContent>
            <ModalFooter></ModalFooter>
        </Modal >
    );
};