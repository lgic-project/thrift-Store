import ApiManager from "./ApiManager";

export const login = async (data: any) => {
  try {
    const result = await ApiManager("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (data: any) => {
  try {
    const result = await ApiManager("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
