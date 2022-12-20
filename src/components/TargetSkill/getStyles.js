import { StyleSheet } from "react-native";
import { SIZES, global, COLORS } from "../../constants";

export const getStyles = (themes) =>
  StyleSheet.create({
    skill: {
      marginLeft: "auto",
      width: SIZES.width * 0.8,
      // height: 61,
      borderRadius: 12,
      overflow: "hidden",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mainWrap: {
      justifyContent: "center",
      marginBottom: 13,
      paddingHorizontal: 23,
    },

    behaviorButtonsWrap: {
      flexDirection: "row",
      width: 215,
    },
    behaviorButton: {
      marginRight: 9,
      width: 58,
      height: 57,
      // overflow: "hidden",
      borderRadius: 24,
      justifyContent: "center",
    },
    behaviorButtonIcon: {
      top: 0,
      left: 0,
      position: "absolute",
    },
    behaviorButtonText: {
      // ...global.p4dark,
      fontSize: 20,
      textAlign: "center",
      color: themes.textColor,
    },
    behaviorButtonName: {
      ...global.p7dark,
      color: themes.textColor,
      textAlign: "center",
    },

    textBlock: {
      width: 57,
      height: 57,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
    },
  });
