import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Icon, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

export const SwitchThemeIconButton = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const boxBackgroundColor = useColorModeValue("teal.300", "teal.600");

    return (
        <IconButton colorScheme="teal" variant="ghost" aria-label="SwitchColorTheme" onClick={toggleColorMode} icon={colorMode == 'light' ? <Icon as={FiSun} /> : <Icon as={FiMoon} />} />
    );
};