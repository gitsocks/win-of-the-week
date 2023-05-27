import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import { useRouter } from "next/router";

const LoginPage = () => {
    const router = useRouter();

    const handleLoginSuccess = () => router.push('/');

    const handleRegisterClick = () => router.push('/auth/register');

    return (
        <LoginForm loginSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />
    );
};

export default LoginPage;