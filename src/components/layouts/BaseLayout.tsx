import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => {
    return (
        <Box height="100vh">
            {children}
        </Box>
    );
};