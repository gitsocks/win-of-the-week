import { CreateShoutout } from "@/types/CreateShoutout";
import { NominateShoutout } from "@/types/NominateShoutout";
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

    const nominateShoutout = async (nomination: NominateShoutout) => {
        const response = await fetch('/api/shoutouts/nominate', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nomination),
        });
    };

    return {
        createShoutout,
        nominateShoutout
    };
};