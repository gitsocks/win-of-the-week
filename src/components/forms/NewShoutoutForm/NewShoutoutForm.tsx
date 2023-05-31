import { useFetchTeamMembersQuery } from "@/services/team/team-queries";
import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { MemberSearchControl } from "../MemberSearchControl/MemberSearchControl";
import { useCreateShoutoutMutation } from "@/services/shoutout/shoutout-mutations";

interface NewShoutoutFormProps {
    teamId: string;
    onSuccess: () => void;
}

export const NewShoutoutForm = ({ teamId, onSuccess }: NewShoutoutFormProps) => {
    const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
    const [shoutout, setShoutout] = useState('');

    const { mutate, isLoading, isSuccess } = useCreateShoutoutMutation();

    const addMember = (member: any) => {
        setSelectedMembers([...[member]]);
    };

    const handleSubmit = () => {
        selectedMembers.forEach(member => {
            mutate({
                userId: member.id,
                shoutout: shoutout,
                teamId: teamId
            });
        });
    };

    if (isSuccess) {
        onSuccess();
    }

    return (
        <>
            <FormControl>
                <FormLabel>Team Member(s)</FormLabel>
                <MemberSearchControl teamId={teamId} onSelectMember={addMember} />
                {selectedMembers.length > 0 && (
                    <FormHelperText>{selectedMembers.map(member => member.fullName).join(', ')}</FormHelperText>
                )}
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Shoutout</FormLabel>
                <Textarea value={shoutout} onChange={(event) => setShoutout(event.target.value)} />
            </FormControl>
            <Flex my={4}>
                <Button onClick={handleSubmit} width="full" colorScheme="teal">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        'Submit Shoutout'
                    )}
                </Button>
            </Flex>
        </>
    );
};