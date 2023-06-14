import { Button } from '@chakra-ui/react';
import { MicrosoftIcon } from '../icons/MicrosoftIcon';

interface SignInWithMicrosoftButtonProps {
    onClick?: () => void;
}

export const SignInWithMicrosoftButton = ({
    onClick,
}: SignInWithMicrosoftButtonProps) => {
    return (
        <Button onClick={onClick} leftIcon={<MicrosoftIcon />}>
            Continue with Microsoft
        </Button>
    );
};