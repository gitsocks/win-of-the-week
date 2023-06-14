import { Badge, Box, IconButton } from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

interface NotificationsBellButtonProps {
    unseenCount: number;
}
export const NotificationsBellButton = ({ unseenCount }: NotificationsBellButtonProps) => {
    return (

        <IconButton
            variant="ghost"
            colorScheme="teal"
            aria-label="notifications bell"
            icon={<Box position="relative" display="inline-block">
                <FiBell />
                {unseenCount > 0 && (
                    <Box
                        bg="red"
                        borderRadius="50%"
                        boxSize="0.5rem"
                        position="absolute"
                        top="-0.25rem"
                        right="-0.25rem"
                    />
                )}
            </Box>}
        />
    );
};