import { createShoutout } from "@/api/handlers/shoutouts/create-shoutout.handler";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";
import type { Shoutout } from "@prisma/client";
import type { NextApiResponse } from "next";
import { Body, Post, Req, Res, createHandler } from "next-api-decorators";

class ShoutoutsHandler {
    @Post()
    @Authorize()
    async createShoutout(@Req() req: UserApiRequest, @Res() res: NextApiResponse, @Body() body: Shoutout) {
        body.authorId = req.userId;
        const shoutout = await createShoutout(body);

        res.send(shoutout);
    }
}

export default createHandler(ShoutoutsHandler);