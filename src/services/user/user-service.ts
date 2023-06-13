export const useUserService = () => {
  const getUserById = async (id: string) => {
    const response = await fetch(`/api/users/${id}`);

    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }

    return response.json();
  };

  const getUserTeams = async (id: string) => {
    const response = await fetch(`/api/users/${id}/teams`);
    return response.json();
  };

  return {
    getUserById,
    getUserTeams,
  };
};
