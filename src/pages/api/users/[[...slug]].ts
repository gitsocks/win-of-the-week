import { createUser } from "@/api/users/create-user";
import { fetchUser } from "@/api/users/fetch-user";
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
    async user(@Param('id') id: string) {
        return await fetchUser(id);
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body() user: User) {
        await createUser(user);
        return user;
    }
}

export default createHandler(UsersHandler);