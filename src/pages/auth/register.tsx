import { RegisterForm } from "@/components/forms/RegisterForm/RegisterForm";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterPage = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSuccessfulRegister = () => onOpen();

    const handleModalClose = () => {
        onClose();
        router.push('/auth/login');
    };

    return (
        <>
            <RegisterForm onSuccessfulRegister={handleSuccessfulRegister} />
            <Modal isOpen={isOpen} onClose={handleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Email</ModalHeader>
                    <ModalBody>
                        <Text>
                            Thank you for registering an account!
                            A confirmation email has been sent to your email.
                            Please login after confirming your email address.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleModalClose}>Okay</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RegisterPage;