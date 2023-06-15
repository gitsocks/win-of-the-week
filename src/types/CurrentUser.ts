import { User, UserTeam } from "@prisma/client";

export type CurrentUser = User & {
    teams: (UserTeam & {
        team: {
            id: string;
            name: string;
        };
    })[];
};