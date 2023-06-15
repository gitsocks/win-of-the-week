import { IconProps } from '@chakra-ui/icon';
import { Icon } from '@chakra-ui/react';

export const MicrosoftIcon = (props: IconProps) => {
    return (
        <Icon viewBox="0 0 21 21" {...props}>
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </Icon>
    );
};