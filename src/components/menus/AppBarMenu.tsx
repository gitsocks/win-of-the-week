import { Icon, IconButton, Menu, MenuButton, MenuIcon, MenuItem, MenuList } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FiLogOut, FiMoreVertical } from "react-icons/fi";

export const AppBarMenu = () => {
    const supabase = createClientComponentClient();

    const handleSignOutClick = async () => {
        await supabase.auth.signOut();
    };

    return (
        <Menu colorScheme="teal">
            <MenuButton as={IconButton} icon={<Icon as={FiMoreVertical} />} variant="ghost" aria-label="Appbar Menu" />
            <MenuList>
                <MenuItem onClick={handleSignOutClick} icon={<Icon as={FiLogOut} />}>
                    Sign Out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};