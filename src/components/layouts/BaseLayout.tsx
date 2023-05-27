import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => {
    return (
        <ChakraProvider>
            {children}
        </ChakraProvider>
    );
};