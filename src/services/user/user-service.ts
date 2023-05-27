export const useUserService = () => {

    const getUserById = async (id: string) => {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);

        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }

        return response.json();
    };

    return {
        getUserById
    };
};