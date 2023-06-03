import { useNominateShoutoutMutation } from "@/services/shoutout/shoutout-mutations";
import { ShoutoutWithUser } from "@/types/ShoutoutWithUser";
import { Box, Card, CardBody, Flex, Heading, IconButton, Spinner, Text } from "@chakra-ui/react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface ShoutoutCardProps {
    shoutout: ShoutoutWithUser;
}

export const ShoutoutCard = ({ shoutout }: ShoutoutCardProps) => {
    const { mutate, isLoading, isSuccess } = useNominateShoutoutMutation();

    const { width, height } = useWindowSize();

    const handleNominateClick = async () => {
        await mutate({
            shoutoutId: shoutout.id,
            teamId: shoutout.teamId
        });
    };

    const getNominateIcon = isLoading ? <Spinner /> : <>🏆</>;

    return (
        <>
            <Card my={4}>
                <CardBody>
                    <Flex justifyContent='space-between' alignItems="center">
                        <Box>
                            <Heading size="xs">{shoutout.user.fullName}</Heading>
                            <Text>{shoutout.shoutout}</Text>
                        </Box>
                        <IconButton onClick={handleNominateClick} variant="outline" aria-label="Nominate" icon={getNominateIcon} />
                    </Flex>
                </CardBody>
            </Card>
            {isSuccess && <Confetti

                width={width}
                height={height}
                numberOfPieces={1000}
                recycle={false}
                gravity={0.05}
                colors={['#ff0000', '#00ff00', '#0000ff']}
                wind={0.02}
            />}
        </>
    );
};