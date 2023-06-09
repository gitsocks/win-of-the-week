import { Body, Get, Param, Post, Query, Req, Res, createHandler } from "next-api-decorators";
import { createTeam } from "@/api/handlers/teams/create-team.handler";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";
import { CreateTeamDto } from "@/api/dtos/create-team.dto";
import type { NextApiResponse } from "next";
import { getTeamById } from "@/api/handlers/teams/get-team-by-id.handler";
import { getMembers } from "@/api/handlers/teams/get-members.handler";
import { getTeamShoutouts } from "@/api/handlers/teams/get-team-shoutouts.handler";
import { createWinOfTheWeek } from "@/api/handlers/win/create-win-of-the-week.handler";
import { getWinOfTheWeek } from "@/api/handlers/win/get-win-of-the-week.handler";

interface Team {
    name: string;
}

class TeamsHandler {

    @Get('/:id')
    @Authorize()
    async getTeam(@Param('id') id: string, @Res() res: NextApiResponse) {
        const team = await getTeamById(id);

        if (team) {
            res.send(team);
        } else {
            res.status(404);
        }
    }

    @Get('/:id/members')
    @Authorize()
    async getTeamMembers(@Param('id') id: string, @Res() res: NextApiResponse, @Query('filter') filter?: string) {
        const members = await getMembers(id, filter);
        res.send(members);
    }

    @Get('/:id/shoutouts')
    @Authorize()
    async getTeamShoutouts(@Param('id') id: string, @Res() res: NextApiResponse, @Query('weekNumber') weekNumber: number, @Query('userId') userId?: string) {
        const shoutouts = await getTeamShoutouts(id, weekNumber, userId);
        res.send(shoutouts);
    }

    @Get('/:id/wotw')
    async getTeamWinOfTheWeek(@Param('id') id: string) {
        const result = await getWinOfTheWeek(id);
        return result;
    }

    @Post('/:id/wotw')
    async createTeamWinOfTheWeek(@Param('id') id: string) {
        const result = await createWinOfTheWeek(id);
        return result;
    }

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