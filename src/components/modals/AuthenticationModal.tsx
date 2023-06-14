import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { NewShoutoutForm } from "../forms/NewShoutoutForm/NewShoutoutForm";
import { LoginForm } from "../forms/LoginForm/LoginForm";
import { useState } from "react";
import { RegisterForm } from "../forms/RegisterForm/RegisterForm";

interface AuthenticationModalProps {
    title?: string;
    isOpen: boolean;
    onAuthenticate?: () => void;
    onClose?: () => void;
    redirectTo?: string;
}

export const AuthenticationModal = ({ isOpen, onClose, title, onAuthenticate, redirectTo }: AuthenticationModalProps) => {
    const [showLogin, setShowLogin] = useState(true);

    const handleLogin = () => {
        if (onAuthenticate) {
            onAuthenticate();
        }
    };

    const handleRegister = () => {
        if (onAuthenticate) {
            onAuthenticate();
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title || "Please sign in to continue"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {showLogin ? (
                        <LoginForm loginSuccess={handleLogin} onRegisterClick={() => setShowLogin(false)} redirectTo={redirectTo} />
                    ) : (
                        <RegisterForm redirectTo={redirectTo} onLoginClick={() => setShowLogin(true)} onSuccessfulRegister={handleRegister} />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};