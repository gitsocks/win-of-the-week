import { Body, Post, createHandler } from "next-api-decorators";
import { Knock } from '@knocklabs/node';

const knock = new Knock(process.env.KNOCK_PUBLIC_API_KEY);

interface Team {
    name: string;
}

class TeamsHandler {
    @Post()
    async createTeam(@Body() team: Team) {
        await knock.workflows.trigger('create-team', {
            data: {
                project_name: 'Win of the Week'
            },
            recipients: ['21335af3-71d1-4e56-99c8-dca35af8a94e']
        });
    }
}

export default createHandler(TeamsHandler);