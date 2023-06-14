import { useCreateWinOfTheWeekMutation } from "@/services/team/team-mutations";
import { useGetWinOfTheWeekQuery } from "@/services/team/team-queries";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

interface CreateWinOfTheWeekModalProps {
    teamId: string;
}
export const CreateWinOfTheWeekModal = ({ teamId }: CreateWinOfTheWeekModalProps) => {
    const { data: winOfTheWeek, isLoading } = useGetWinOfTheWeekQuery(teamId);
    const { mutate: createWinOfTheWeek, isLoading: isCreating } = useCreateWinOfTheWeekMutation();
    const isFriday = new Date().getDay() === 3;
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (!isLoading) {
            console.log(!winOfTheWeek && isFriday);
            console.log(winOfTheWeek);
            if (!winOfTheWeek && isFriday) {
                onOpen();
            } else {
                onClose();
            }
        }
    }, [isLoading, winOfTheWeek]);

    const handleClick = () => {
        createWinOfTheWeek(teamId);
    };

    return (
        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>It's Friday!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>It is time to determince this week's Win of the Week! Simply click the button below 🥳.</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClick} variant="solid" colorScheme="teal" width="full">{isCreating ? <Spinner /> : 'Win of the Week'}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};