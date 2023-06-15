import { CreateTeamDto } from "@/api/dtos/create-team.dto";
import prisma from "@/api/prisma";

export const createTeam = async (newTeam: CreateTeamDto) => {
    if (!newTeam.createdBy) {
        throw new Error('No user specified for the new team!');
    }

    const team = await prisma.team.create({
        data: {
            name: newTeam.name
        }
    });

    await prisma.userTeam.create({
        data: {
            userId: newTeam.createdBy,
            teamId: team.id
        }
    });

    return team;
};