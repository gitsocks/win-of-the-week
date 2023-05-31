import { CreateShoutout } from "@/types/CreateShoutout";
import { Shoutout } from "@prisma/client";

export const useShoutoutService = () => {
    const createShoutout = async (shoutout: CreateShoutout) => {
        const response = await fetch('/api/shoutouts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shoutout),
        });

        return response.json();
    };

    return {
        createShoutout
    };
};