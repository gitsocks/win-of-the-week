import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export interface LoginFormProps {
    loginSuccess: () => void;
    onRegisterClick: () => void;
}

export const LoginForm = ({ loginSuccess, onRegisterClick }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const supabase = createClientComponentClient();
    const toast = useToast();

    const handleSignIn = async () => {
        const response = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (response.error) {
            toast({
                title: 'Login Failed',
                description: response.error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: 'bottom-left',
                variant: "left-accent"
            });
            return;
        }
        loginSuccess();
    };

    const handleRegisterAccountClick = () => onRegisterClick();

    return (
        <Box>
            <Heading size='lg' mb={6}>Login to account</Heading>
            <FormControl mb={2}>
                <FormLabel>Email</FormLabel>
                <Input placeholder="john.doe@example.com" variant='filled' type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </FormControl>
            <FormControl mb={2}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder="*******" variant='filled' type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Flex direction='column'>
                <Button mt={4} mb={4} colorScheme="teal" onClick={handleSignIn}>Sign In</Button>
                <Button mb={4} variant="link" onClick={handleRegisterAccountClick}>Register an account?</Button>
            </Flex>
        </Box>
    );
};