import { createUser } from "@/api/handlers/users/create-user";
import { fetchUser } from "@/api/handlers/users/fetch-user";
import { getCurrentUser } from "@/api/handlers/users/get-current-user.handler";
import { getUserTeams } from "@/api/handlers/users/get-user-teams";
import { Authorize } from "@/api/middleware/authorize";
import type { UserApiRequest } from "@/api/middleware/authorize";
import type { User } from "@prisma/client";
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
export interface AzureToken {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    provider_id: string;
    sub: string;
  };
  role: string;
  aal: string;
  amr: {
    method: string;
    timestamp: number;
  }[];
  session_id: string;
}

const getUserFromAzureJwt = (token: string) => {
  const [, payloadBase64] = token.split(".");
  const payload = Buffer.from(payloadBase64, "base64").toString();
  const tokenObject: AzureToken = JSON.parse(payload);

  return {
    id: tokenObject.sub,
    name: tokenObject.user_metadata.name,
    email: tokenObject.email,
  };
};

class UsersHandler {
  @Get("/current")
  @Authorize()
  async getCurrentUser(@Req() req: UserApiRequest) {
    let user = await getCurrentUser(req.userId);

    if (!user) {
      const azureUser = getUserFromAzureJwt(req.accessToken);

      try {
        await createUser(
          {
            id: req.userId,
            fullName: azureUser.name || "Stranger Danger",
          },
          req.email
        );

        user = await getCurrentUser(req.userId);
      } catch (error) {
        console.log(error);
      }
    }

    return user;
  }

  @Get("/:id")
  async user(@Param("id") id: string) {
    return await fetchUser(id);
  }

  @Get("/:id/teams")
  async userTeams(@Param("id") id: string) {
    return await getUserTeams(id);
  }

  @Post()
  @HttpCode(201)
  async createUser(@Req() req: UserApiRequest, @Body() user: User) {
    await createUser(user, req.email);
    return user;
  }
}

export default createHandler(UsersHandler);
