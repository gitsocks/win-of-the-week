import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export interface RegisterFormProps {
    onSuccessfulRegister: () => void;
}

export const RegisterForm = ({ onSuccessfulRegister }: RegisterFormProps) => {
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
            position: 'top',

        });

        if (!response.data.user) return;

        const data = { id: response.data.user.id, fullName: fullname };

        const fetchResponse = await fetch('http://localhost:3000/api/users', {
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
            <Heading size='lg'>Register a new account</Heading>
            <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" value={fullname} onChange={(event) => setFullname(event.target.value)} />
            </FormControl>
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
            <Button onClick={handleRegister}>Register</Button>
        </Box>
    );
};