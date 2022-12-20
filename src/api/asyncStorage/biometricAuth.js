import AsyncStorage from "@react-native-community/async-storage";

export const enable = async () => {
  try {
    await AsyncStorage.setItem("@biometricAuth", "true");
  } catch (e) {
    console.log(e);
  }
};

export const isEnabled = async () => {
  try {
    const value = await AsyncStorage.getItem("@biometricAuth");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const disable = async () => {
  try {
    await AsyncStorage.setItem("@biometricAuth", "false");
  } catch (e) {
    console.log(e);
  }
};

export const remove = async () => {
  try {
    await AsyncStorage.removeItem("@biometricAuth");
  } catch (e) {
    console.log(e);
  }
};

export const biometrics = {
  disable,
  enable,
  isEnabled,
  remove,
};
