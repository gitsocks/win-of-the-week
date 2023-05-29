import { useRouter } from "next/router";

export const useUserService = () => {
    const getUserById = async (id: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`);

        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }

        return response.json();
    };

    return {
        getUserById
    };
};