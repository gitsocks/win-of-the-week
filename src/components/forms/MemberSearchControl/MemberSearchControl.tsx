import { useFetchTeamMembersQuery } from "@/services/team/team-queries";
import { FormControl, FormHelperText, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Spinner } from "@chakra-ui/react";
import { useState } from "react";

interface MemberSearchControlProps {
    teamId: string;
    onSelectMember: (member: any) => void;
}

export const MemberSearchControl = ({ teamId, onSelectMember }: MemberSearchControlProps) => {
    const [searchValue, setSearchValue] = useState('');
    const { data: members, isLoading } = useFetchTeamMembersQuery(teamId, searchValue);

    const handleMemberSelect = (member: any) => {
        setSearchValue('');
        onSelectMember(member);
    };

    return (
        <>
            <Menu isOpen={searchValue.length > 3}>
                <MenuButton />
                <MenuList>
                    {members && members.length > 0 ? members.map((member: any) => (
                        <MenuItem key={member.id} onClick={() => handleMemberSelect(member)}>{member.fullName}</MenuItem>
                    )) : (isLoading ? <MenuItem><Spinner /></MenuItem> : <MenuItem>No members found</MenuItem>)}
                </MenuList>
            </Menu>
            <Input placeholder="Search users" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
        </>
    );
};