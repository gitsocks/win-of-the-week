import { useFetchUserTeamsQuery } from "@/services/user/user-queries";
import { Box, Button, Text, Card, CardBody, Flex, Heading, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FiAlignCenter, FiHash } from "react-icons/fi";
import { MembersList } from "../lists/MembersList";

interface MembersModalProps {
    isOpen: boolean;
    onClose: () => void;
    members: any[];
    teamId: string;
}

export const MembersModal = ({ isOpen, onClose, members, teamId }: MembersModalProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>View Members</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <MembersList teamId={teamId} />
                </ModalBody>
                <ModalFooter />
            </ModalContent>
            <ModalFooter></ModalFooter>
        </Modal >
    );
};