import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
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
                position: 'top',
            });
            return;
        }
        loginSuccess();
    };

    const handleRegisterAccountClick = () => onRegisterClick();

    return (
        <Box>
            <Heading size='lg'>Login to account</Heading>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Box>
                <Button onClick={handleSignIn}>Sign In</Button>
            </Box>
            <Box>
                <Button variant="link" onClick={handleRegisterAccountClick}>Register an account</Button>
            </Box>
        </Box>
    );
};