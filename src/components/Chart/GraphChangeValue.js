import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { color } from "react-native-reanimated";
import { COLORS } from "../../constants";

export default function GraphChangeValue({
  value,
  change,
  action_type,
  themes,
}) {
  const getChangeColor = () => {
    return !change ? COLORS.white : COLORS.green;
  };

  const styles = StyleSheet.create({
    wrap: { flexDirection: "row", marginBottom: 25 },
    text: {
      color: themes.textColor,
      opacity: 0.6,
    },
    value: {
      color: value !== "none" ? getChangeColor() : themes.textColor,
      opacity: 0.6,
    },
  });

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Change: </Text>
      <Text style={styles.value}>
        {value !== "none"
          ? Number.isInteger(value)
            ? value
            : Math.round(value * 100) / 100
          : value}
        {value !== "none" && "%"}
      </Text>
    </View>
  );
}
