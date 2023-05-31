import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { NewShoutoutForm } from "../forms/NewShoutoutForm/NewShoutoutForm";
import { useRouter } from "next/router";

interface NewShoutoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewShoutoutModal = ({ isOpen, onClose }: NewShoutoutModalProps) => {
    const router = useRouter();
    const toast = useToast();
    const { teamId } = router.query;

    const handleSuccess = () => {
        onClose();
        toast({
            title: 'Success!',
            description: 'A new shoutout has successfully been created 🙌.',
            variant: "left-accent",
            status: 'success'
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Shoutout</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <NewShoutoutForm onSuccess={handleSuccess} teamId={teamId as string} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};