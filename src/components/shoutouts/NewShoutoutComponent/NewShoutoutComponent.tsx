import { NewShoutoutModal } from "@/components/modals/NewShoutoutModal";
import { Card, CardBody, Flex, Kbd, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const NewShoutoutComponent = () => {
    const [showNewShoutoutModal, setShowNewShoutoutModal] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === ' ' && event.ctrlKey) {
                setShowNewShoutoutModal(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <Card onClick={() => setShowNewShoutoutModal(true)} width="md">
                <CardBody padding={3}>
                    <Flex justifyContent="space-between">
                        <Flex>
                            <Text mr={5}>📢</Text>
                            <Text color="gray.400">Post a new shoutout</Text>
                        </Flex>
                        <Flex>
                            <Kbd>Ctrl</Kbd>+<Kbd>Space</Kbd>
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>
            <NewShoutoutModal isOpen={showNewShoutoutModal} onClose={() => setShowNewShoutoutModal(false)} />
        </>
    );
};