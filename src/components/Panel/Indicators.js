import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export default function Indicators({ activeScreen = 1, theme }) {
  const styles = StyleSheet.create({
    indicators: {
      position: "absolute",
      top: -20,
      zIndex: 100,
      flexDirection: "row",
      alignSelf: "center",
      paddingLeft: 7,
    },
    indicator: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginRight: 7,
      backgroundColor: theme === "dark" ? "#353B4F" : "#E4E5EB",
    },
    indicatorActive: {
      backgroundColor: COLORS.darkGreen,
    },
    indicatorDisabled: {
      opacity: 0.3,
    },
  });

  const activeScreens = [1, 2, 3, 4];
  return (
    <View style={styles.indicators}>
      {activeScreens.map((e) => {
        return (
          <View
            key={e}
            style={[
              styles.indicator,
              e === activeScreen && styles.indicatorActive,
              activeScreen + 1 === e && styles.indicatorDisabled,
            ]}
          ></View>
        );
      })}
    </View>
  );
}
