import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { BaseLayout } from "@/components/layouts/BaseLayout";

const LoginPage: NextPageWithLayout = () => {
    const router = useRouter();
    const formBackground = useColorModeValue("gray.100", "gray.700");

    const handleLoginSuccess = () => router.push('/');

    const handleRegisterClick = () => router.push('/auth/register');

    return (
        <Flex justifyContent='space-around' alignItems='center' height='90vh'>
            <Box width='sm' padding='4' backgroundColor={formBackground} borderRadius='8'>
                <LoginForm redirectTo="" loginSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />
            </Box>
        </Flex>
    );
};

LoginPage.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default LoginPage;