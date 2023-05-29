import { useRouter } from "next/router";

export const useUserService = () => {
    const getUserById = async (id: string) => {
        const response = await fetch(`/api/users/${id}`);

        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }

        return response.json();
    };

    return {
        getUserById
    };
};