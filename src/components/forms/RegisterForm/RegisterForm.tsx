import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export interface RegisterFormProps {
    onSuccessfulRegister: () => void;
    onLoginClick: () => void;
}

export const RegisterForm = ({ onSuccessfulRegister, onLoginClick }: RegisterFormProps) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const supabase = createClientComponentClient();
    const toast = useToast();

    const handleRegister = async () => {
        const response = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (response.error) {
            toast({
                title: 'Register Failed',
                description: response.error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        toast({
            title: 'Confirm Email',
            description: `A confirmation email has been sent to ${response.data.user?.email}.`,
            status: "info",
            duration: 9000,
            isClosable: true,
            position: 'bottom-left',
            variant: "left-accent"
        });

        if (!response.data.user) return;

        const data = { id: response.data.user.id, fullName: fullname };

        await fetch(`/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        onSuccessfulRegister();
    };

    return (
        <Box>
            <Heading size='lg' mb={6}>Register a new account</Heading>
            <FormControl mb={2}>
                <FormLabel>Full Name</FormLabel>
                <Input variant="filled" placeholder="John Doe" type="text" value={fullname} onChange={(event) => setFullname(event.target.value)} />
            </FormControl>
            <FormControl mb={2}>
                <FormLabel>Email</FormLabel>
                <Input variant="filled" placeholder="john.doe@example.com" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </FormControl>
            <FormControl mb={2}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input variant="filled" placeholder="********" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Flex direction="column">
                <Button mt={4} mb={4} colorScheme="teal" onClick={handleRegister}>Register</Button>
                <Button mb={4} variant="link" onClick={onLoginClick}>Login instead?</Button>
            </Flex>
        </Box>
    );
};