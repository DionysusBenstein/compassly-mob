import AsyncStorage from "@react-native-community/async-storage";

export const setTheme = async (value) => {
  try {
    await AsyncStorage.setItem("@theme", value);
  } catch (e) {
    console.log(e);
  }
};

export const getTheme = async () => {
  try {
    const value = await AsyncStorage.getItem("@theme");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const clearTheme = async () => {
  try {
    await AsyncStorage.removeItem("@theme");
  } catch (e) {
    console.log(e);
  }
};
