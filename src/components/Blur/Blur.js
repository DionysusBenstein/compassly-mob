import React from "react";
import { StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default function Blur({ theme, blurType = "light" }) {
  const styles = StyleSheet.create({
    absolute: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor:
        theme === "dark" && blurType === "light"
          ? "rgba(0,0,0, 0.4 )"
          : "transparent",
    },
  });

  return (
    <BlurView
      // overlayColor=""

      style={styles.absolute}
      blurType={blurType}
      blurAmount={30}
    />
  );
}
