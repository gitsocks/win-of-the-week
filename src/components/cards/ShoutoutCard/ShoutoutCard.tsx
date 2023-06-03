import { useNominateShoutoutMutation } from "@/services/shoutout/shoutout-mutations";
import { ShoutoutWithUser } from "@/types/ShoutoutWithUser";
import { Box, Card, CardBody, Flex, Heading, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface ShoutoutCardProps {
    shoutout: ShoutoutWithUser;
    isFetching: boolean;
}

export const ShoutoutCard = ({ shoutout, isFetching }: ShoutoutCardProps) => {
    const { mutate, isLoading, isSuccess } = useNominateShoutoutMutation();
    const { session } = useSessionContext();

    const { width, height } = useWindowSize();

    const handleNominateClick = async () => {
        await mutate({
            shoutoutId: shoutout.id,
            teamId: shoutout.teamId
        });
    };

    const getNominateIcon = isLoading || isFetching ? <Spinner /> : (
        shoutout.nominations?.find((nomination: any) => nomination.userId == session?.user.id) ?
            (
                <>{shoutout.nominations.length}</>
            ) : (
                <>🏆</>
            )
    );

    return (
        <>
            <Card my={4}>
                <CardBody>
                    <Flex justifyContent='space-between' alignItems="center">
                        <Box>
                            <Heading size="xs">{shoutout.user.fullName}</Heading>
                            <Text>{shoutout.shoutout}</Text>
                        </Box>
                        <IconButton isDisabled={shoutout.nominations.find(nomination => nomination.userId == session?.user.id) !== undefined} onClick={handleNominateClick} variant="outline" aria-label="Nominate" icon={getNominateIcon} />
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