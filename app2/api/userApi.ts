import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem("AccessToken");
    if (!token) throw new Error("No auth token found");
    const result = await ApiManager("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await AsyncStorage.removeItem("AccessToken");
    console.log("Token removed");
  }
};

export const getMe = async () => {
  try {
    const token = await AsyncStorage.getItem("AccessToken");
    if (!token) throw new Error("No auth token found");
    const result = await ApiManager("/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

