import AsyncStorage from "@react-native-async-storage/async-storage";

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem("AccessToken");
  return token !== null;
};