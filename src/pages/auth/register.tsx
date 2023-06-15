import { RegisterForm } from "@/components/forms/RegisterForm/RegisterForm";
import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { BaseLayout } from "@/components/layouts/BaseLayout";

const RegisterPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const formBackground = useColorModeValue("gray.100", "gray.700");

    const handleSuccessfulRegister = () => onOpen();

    const handleModalClose = () => {
        onClose();
        router.push('/auth/login');
    };

    return (
        <>
            <Flex justifyContent='space-around' alignItems='center' height='90vh'>
                <Box width='sm' padding='4' backgroundColor={formBackground} borderRadius='8'>
                    <RegisterForm redirectTo="" onSuccessfulRegister={handleSuccessfulRegister} onLoginClick={() => router.push('/auth/login')} />
                </Box>
            </Flex>

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

RegisterPage.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default RegisterPage;