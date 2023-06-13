import { createUser } from "@/api/handlers/users/create-user";
import { fetchUser } from "@/api/handlers/users/fetch-user";
import { getCurrentUser } from "@/api/handlers/users/get-current-user.handler";
import { getUserTeams } from "@/api/handlers/users/get-user-teams";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";
import type { User } from "@prisma/client";
import type { NextApiResponse } from "next";
import {
  Body,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  createHandler,
} from "next-api-decorators";

class UsersHandler {
  @Get()
  users() {
    return [
      {
        id: "abc-def",
        fullName: "Billy Anderson",
      },
    ];
  }

  @Get("/:id")
  async user(@Param("id") id: string) {
    return await fetchUser(id);
  }

  @Get("/:id/teams")
  async userTeams(@Param("id") id: string) {
    return await getUserTeams(id);
  }

  @Get("/current")
  @Authorize()
  async getCurrentUser(
    @Req() req: UserApiRequest,
    @Res() res: NextApiResponse
  ) {
    console.log(req.userId);
    const user = await getCurrentUser(req.userId);
    res.send(user);
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() user: User) {
    await createUser(user);
    return user;
  }
}

export default createHandler(UsersHandler);
