import type { CreateInviteDto } from "@/api/dtos/create-invite.dto";
import { acceptInvite } from "@/api/handlers/invites/accept-invite.handler";
import { createInvite } from "@/api/handlers/invites/create-invite.handler";
import { getInvite } from "@/api/handlers/invites/get-invite.handler";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";

import { Body, Get, Param, Post, Req, createHandler } from "next-api-decorators";

class InvitesHandler {
    @Get('/:id')
    async getInvite(@Param('id') id: string) {
        const invite = await getInvite(id);
        return invite;
    }

    @Post()
    @Authorize()
    async createInvite(@Req() req: UserApiRequest, @Body() invite: Pick<CreateInviteDto, 'teamId'>) {
        const newInvite: CreateInviteDto = { userId: req.userId, ...invite };
        const response = await createInvite(newInvite);

        return {
            invite: response,
            link: `${process.env.NEXT_PUBLIC_BASE_URL}/invites/${response.id}`
        };
    }

    @Post('/:id/accept')
    @Authorize()
    async acceptInvite(@Req() req: UserApiRequest, @Param('id') id: string) {
        const teamId = await acceptInvite(req.userId, id);
        return { teamId: teamId };
    }
}

export default createHandler(InvitesHandler);