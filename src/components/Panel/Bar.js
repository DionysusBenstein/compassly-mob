import * as React from "react";
import { StyleSheet, View } from "react-native";

export const Bar = ({ barStyle }) => {
  return (
    <View style={BarStyles.barContainer}>
      <View style={[BarStyles.bar, barStyle]} />
      <View style={[BarStyles.bar, barStyle]} />
    </View>
  );
};

const BarStyles = StyleSheet.create({
  barContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "",
    paddingVertical: 10,
    position: "absolute",
    width: "100%",
    zIndex: 100,
    // top: 100,
  },
  bar: {
    width: "10%",
    height: 5,
    borderRadius: 5,
    marginTop: 4,
    marginBottom: 0,
    backgroundColor: "#e2e2e2",
  },
});
