import { CreateTeamForm } from "@/components/forms/CreateTeamForm/CreateTeamForm";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CreateTeamPage = () => {
    const router = useRouter();
    const formBackground = useColorModeValue("gray.100", "gray.700");

    const handleTeamCreate = (teamId: string) => {
        router.push({
            pathname: '/teams/[teamId]',
            query: { teamId }
        });
    };

    return (
        <Flex justifyContent="space-around" alignItems='center' height='90vh'>
            <Box width="lg" padding='4' backgroundColor={formBackground} borderRadius='8'>
                <CreateTeamForm onSuccess={handleTeamCreate} />
            </Box>
        </Flex>
    );
};

CreateTeamPage.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default CreateTeamPage;