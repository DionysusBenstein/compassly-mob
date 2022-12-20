import AsyncStorage from "@react-native-community/async-storage";

export const setToken = async (value) => {
  try {
    await AsyncStorage.setItem("@token", value);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem("@token");
  } catch (e) {
    console.log(e);
  }
};
