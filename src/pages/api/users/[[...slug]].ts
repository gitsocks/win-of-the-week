import { createUser } from "@/api/users/create-user";
import type { User } from "@prisma/client";
import { Body, Get, HttpCode, Param, Post, Req, createHandler } from "next-api-decorators";

class UsersHandler {
    @Get()
    users() {
        return [
            {
                id: 'abc-def',
                fullName: 'Billy Anderson'
            }
        ];
    }

    @Get('/:id')
    user(@Param('id') id: string) {
        return {
            id: id,
            fullName: 'Billy Anderson'
        };
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body() user: User) {
        await createUser(user);
        return user;
    }
}

export default createHandler(UsersHandler);