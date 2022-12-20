import { Dimensions, Platform, Appearance } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  pink: "#F53F8E",
  dark: "#07172E",
  gray: "#717B8B",
  lightGray: "#F0F3F8",
  mediumGray: "#B7B7B7",
  darkGray: "#8F8F8F",
  darkGreen: "#41B52E",
  darkAshPurple: "#353B4F",
  mediumAshPurple: "#444A63",
  white: "#FFFFFF",
  black: "#000",
  red: "#F86B6B",
  blue: "rgba(82, 22, 248, 0.9)",
  green: "#56E13F",
  pastelBlue: "#A0BEEB",
  happyPurple: "#7040C7",
};

const theme = "dark";

export const THEMES = {
  themeTextColor: theme === "light" ? "#353B4F" : "#FFFFFF",
  themeInvertColor: theme === "light" ? "#FFFFFF" : "#353B4F",
  transparent: "transparent",
  darkAshButtonColor: theme === "dark" ? COLORS.darkGray : COLORS.white,
  eyeColor: `${theme === "dark" ? "#8F8F8F" : "#FFFFFF"}`,
  positiveColor: COLORS.green,
  negativeColor: "rgba(255,255,255, 0.5)",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  t1: 40,
  t2: 32,
  t3: 24,
  t4: 20,
  t5: 15,
  t6: 14,
  t7: 10,

  width,
  height,

  containerWidth: width * 0.82,
};

export const FONTS = {
  // sfLight: Platform.OS === "ios" ? "SFProDisplay-Light" : "roboto-light",
  // sfMedium: Platform.OS === "ios" ? "SFProDisplay-Medium" : "roboto-medium",
  sfRegular: "SFProDisplay-Regular",
  sfRegularItalic: "SFProDisplay-RegularItalic",
  sfBoldItalic: "SFProDisplay-SemiboldItalic",
  // sfThin: Platform.OS === "ios" ? "SFProDisplay-Thin" : "roboto-thin",
  sfBold: "SFProDisplay-Semibold",
};

const appTheme = { COLORS, SIZES, FONTS, THEMES };

export default appTheme;
