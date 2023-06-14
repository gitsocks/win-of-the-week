import { createMiddlewareDecorator, NextFunction } from "next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createPagesServerClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";

export interface UserApiRequest extends NextApiRequest {
  userId: string;
  accessToken: string;
  email: string;
}

export const Authorize = createMiddlewareDecorator(
  async (req: UserApiRequest, res: NextApiResponse, next: NextFunction) => {
    const supabase = createPagesServerClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session)
      return res.status(401).json({
        error: "not_authenticated",
        description:
          "The user does not have an active session or is not authenticated",
      });

    req.userId = session.user.id;
    req.accessToken = session.access_token;
    req.email = session.user.email || "";

    next();
  }
);
