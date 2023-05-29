import { Body, Post, Req, Res, createHandler } from "next-api-decorators";
import { Knock } from '@knocklabs/node';
import { createTeam } from "@/api/handlers/teams/create-team.handler";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";
import { CreateTeamDto } from "@/api/dtos/create-team.dto";
import type { NextApiResponse } from "next";

const knock = new Knock(process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY);

interface Team {
    name: string;
}

class TeamsHandler {

    @Post()
    @Authorize()
    async createTeam(@Req() req: UserApiRequest, @Res() res: NextApiResponse, @Body() team: Team) {
        const teamToCreate: CreateTeamDto = { name: team.name, createdBy: req.userId };
        try {
            const createdTeam = await createTeam(teamToCreate);
            res.status(201).send(createdTeam);
        } catch (error) {
            res.status(400).send((error as any).message);
        }
    }
}

export default createHandler(TeamsHandler);