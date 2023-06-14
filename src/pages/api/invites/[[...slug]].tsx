import type { CreateInviteDto } from "@/api/dtos/create-invite.dto";
import { createInvite } from "@/api/handlers/invites/create-invite.handler";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";

import { Body, Post, Req, createHandler } from "next-api-decorators";

class InvitesHandler {
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
}

export default createHandler(InvitesHandler);