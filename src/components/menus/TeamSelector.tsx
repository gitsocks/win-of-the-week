import { useFetchTeamQuery } from "@/services/team/team-queries";
import { Button, Menu, MenuButton, MenuList, Spinner, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiChevronDown } from "react-icons/fi";
import { SwitchTeamModal } from "../modals/SwitchTeamModal";

export const TeamSelector = () => {
    const router = useRouter();
    const { teamId } = router.query;
    const { data: team, isLoading } = useFetchTeamQuery(teamId as string);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleModalClose = () => {
        onClose();
    };

    return (
        <>
            <Button colorScheme="teal" onClick={() => onOpen()} variant="link" rightIcon={isLoading ? <Spinner /> : <FiChevronDown />}>{team && team.name}</Button>
            <SwitchTeamModal isOpen={isOpen} onClose={handleModalClose} />
        </>
    );
};