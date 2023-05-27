import { ChakraProvider } from "@chakra-ui/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { PropsWithChildren, useState } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => {
    const [supabaseClient] = useState(() => createPagesBrowserClient());

    return (
        <ChakraProvider>
            <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={null}>
                {children}
            </SessionContextProvider>
        </ChakraProvider>
    );
};