import { StyleSheet, StatusBar } from "react-native";
// import { color } from "react-native-reanimated";
import { FONTS, COLORS, SIZES } from "./theme";
import { getStatusBarHeight } from "react-native-status-bar-height";

const colorTheme = "dark";

export const global = StyleSheet.create({
  hitslop: {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  },
  hitslopSmall: {
    top: 5,
    left: 0,
    right: 0,
    bottom: 5,
  },
  container: {
    flex: 1,
    width: SIZES.width * 0.88,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: FONTS.sfRegular,
    zIndex: 100,
  },
  containerPadding: {
    paddingLeft: SIZES.width * 0.06,
    paddingRight: SIZES.width * 0.06,
  },
  safeAreaContainer: {
    flex: 1,
    width: SIZES.width * 0.88,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: FONTS.sfRegular,
    zIndex: 100,
    marginTop: getStatusBarHeight(),
  },

  //fonts - family - size - color
  textInput: {
    // paddingVertical: 16,
    backgroundColor: "transparent",
    borderRadius: 12,
    width: "100%",
    fontSize: SIZES.t5,
    fontFamily: FONTS.sfRegular,
    paddingHorizontal: 28,
    height: 50,
    borderColor: "rgba(255,255,255, 0.2)",
    borderWidth: 1,
    overflow: "hidden",
    borderStyle: "solid",
  },
  textInputError: {
    borderColor: COLORS.red,
    borderWidth: 1,
    borderStyle: "solid",
    color: COLORS.red,
  },
  inputGroup: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    // paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    position: "relative",
  },
  label: {
    fontFamily: FONTS.sfBold,
    fontSize: SIZES.t5,
    marginBottom: 8,
  },
  //headers
  h1dark: {
    fontFamily: FONTS.sfBold,
    fontSize: SIZES.t1,
    // color: COLORS.dark,
  },

  h2dark: {
    fontFamily: FONTS.sfBold,
    // color: COLORS.dark,
    fontSize: SIZES.t2,
  },

  h3dark: {
    fontFamily: FONTS.sfBold,
    fontSize: SIZES.t3,
    // color: COLORS.dark,
  },

  h4dark: {
    fontFamily: FONTS.sfBold,
    // color: COLORS.dark,
    fontSize: SIZES.t4,
  },

  h5dark: {
    // color: COLORS.dark,
    fontFamily: FONTS.sfBold,
    fontSize: SIZES.t5,
  },

  h6dark: {
    fontFamily: FONTS.sfBold,
    // color: COLORS.dark,
    fontSize: SIZES.t6,
  },

  h7dark: {
    fontFamily: FONTS.sfBold,
    // color: COLORS.dark,
    fontSize: SIZES.t7,
  },

  h1White: {
    fontFamily: FONTS.sfBold,
    fontSize: SIZES.t1,
    color: COLORS.white,
  },

  h2White: {
    fontFamily: FONTS.sfBold,
    color: COLORS.white,
    fontSize: SIZES.t2,
  },

  h3White: {
    fontFamily: FONTS.sfBold,
    fontSize: SIZES.t3,
    color: COLORS.white,
  },

  h4White: {
    fontFamily: FONTS.sfBold,
    color: COLORS.white,
    fontSize: SIZES.t4,
  },

  h5White: {
    fontFamily: FONTS.sfBold,
    color: COLORS.white,
    fontSize: SIZES.t5,
  },

  h6White: {
    fontFamily: FONTS.sfBold,
    color: COLORS.white,
    fontSize: SIZES.t6,
  },

  h7White: {
    fontFamily: FONTS.sfBold,
    color: COLORS.white,
    fontSize: SIZES.t7,
  },

  //regular
  p1dark: {
    fontFamily: FONTS.sfRegular,
    fontSize: SIZES.t1,
    // color: COLORS.dark,
  },

  p2dark: {
    fontFamily: FONTS.sfRegular,
    // color: COLORS.dark,
    fontSize: SIZES.t2,
  },

  p3dark: {
    fontFamily: FONTS.sfRegular,
    fontSize: SIZES.t3,
    // color: COLORS.dark,
  },

  p4dark: {
    fontFamily: FONTS.sfRegular,
    // color: COLORS.dark,
    fontSize: SIZES.t4,
  },

  p5dark: {
    fontFamily: FONTS.sfRegular,
    // color: COLORS.dark,
    fontSize: SIZES.t5,
  },

  p6dark: {
    fontFamily: FONTS.sfRegular,
    // color: COLORS.dark,
    fontSize: SIZES.t6,
  },

  p7dark: {
    fontFamily: FONTS.sfRegular,
    // color: COLORS.dark,
    fontSize: SIZES.t7,
  },

  p1White: {
    fontFamily: FONTS.sfRegular,
    fontSize: SIZES.t1,
    color: COLORS.white,
  },

  p2White: {
    fontFamily: FONTS.sfRegular,
    color: COLORS.white,
    fontSize: SIZES.t2,
  },

  p3White: {
    fontFamily: FONTS.sfRegular,
    fontSize: SIZES.t3,
    color: COLORS.white,
  },

  p4White: {
    fontFamily: FONTS.sfRegular,
    color: COLORS.white,
    fontSize: SIZES.t4,
  },

  p5White: {
    fontFamily: FONTS.sfRegular,
    color: COLORS.white,
    fontSize: SIZES.t5,
  },

  p6White: {
    fontFamily: FONTS.sfRegular,
    color: COLORS.white,
    fontSize: SIZES.t6,
  },

  p7White: {
    fontFamily: FONTS.sfRegular,
    color: COLORS.white,
    fontSize: SIZES.t7,
  },

  // links
  a1: {
    fontSize: SIZES.t5,
    color: COLORS.dark,
    textDecorationLine: "underline",
  },

  a2: {
    fontSize: SIZES.t6,
    color: COLORS.dark,
    textDecorationLine: "underline",
  },

  a3: {
    fontSize: SIZES.t7,
    color: COLORS.dark,
    textDecorationLine: "underline",
  },

  //shadow
  mainShadow: {
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 5,
  },
});
