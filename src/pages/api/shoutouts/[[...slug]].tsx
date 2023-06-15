import { createShoutout } from "@/api/handlers/shoutouts/create-shoutout.handler";
import { nominateShoutout } from "@/api/handlers/shoutouts/nominate-shoutout.handler";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";
import type { Nomination, Shoutout } from "@prisma/client";
import type { NextApiResponse } from "next";
import { Body, Param, Post, Req, Res, createHandler } from "next-api-decorators";

class ShoutoutsHandler {
    @Post()
    @Authorize()
    async createShoutout(@Req() req: UserApiRequest, @Res() res: NextApiResponse, @Body() body: Shoutout) {
        body.authorId = req.userId;
        const shoutout = await createShoutout(body);

        res.send(shoutout);
    }

    @Post('/nominate')
    @Authorize()
    async nominateShoutout(@Req() req: UserApiRequest, @Res() res: NextApiResponse, @Body() nomination: Nomination) {
        nomination.userId = req.userId;
        try {
            await nominateShoutout(nomination);
            res.send(nomination);
        } catch (error) {
            const err = error as any;
            res.status(400).send(err.message);
        }
    }
}

export default createHandler(ShoutoutsHandler);