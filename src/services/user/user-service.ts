export const useUserService = () => {
  const getUserById = async (id: string) => {
    const response = await fetch(`/api/users/${id}`);

    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }

    return response.json();
  };

  const getCurrentUser = async () => {
    const response = await fetch("/api/users/current", {
      method: "GET",
    });
    console.log(response);
    try {
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const getUserTeams = async (id: string) => {
    const response = await fetch(`/api/users/${id}/teams`);
    return response.json();
  };

  return {
    getUserById,
    getUserTeams,
    getCurrentUser,
  };
};
