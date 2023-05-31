import { useCreateTeamMutation } from "@/services/team/team-mutations";
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CreateTeamFormProps {
    onSuccess: (id: string) => void;
}

export const CreateTeamForm = ({ onSuccess }: CreateTeamFormProps) => {
    const { data: createdTeam, mutate: createTeam, isLoading, isSuccess } = useCreateTeamMutation();

    const [teamName, setTeamName] = useState('');

    const handleCreateTeamClick = () => {
        createTeam({ name: teamName });
    };

    if (isSuccess) {
        onSuccess(createdTeam.id);
    }

    return (
        <Box>
            <Heading size="lg">Create new team</Heading>
            <Text>You are not a member of any teams, so let's create one for you 😁.</Text>
            <FormControl mb={2}>
                <FormLabel>Team Name</FormLabel>
                <Input variant='filled' type="text" value={teamName} onChange={(event) => setTeamName(event.target.value)} />
                <FormHelperText>e.g. Pink Fluffy Kittens</FormHelperText>
            </FormControl>
            <Button disabled={isLoading} onClick={handleCreateTeamClick} colorScheme="teal">Create Team</Button>
        </Box>
    );
};