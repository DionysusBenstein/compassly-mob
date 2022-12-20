import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { global } from "../../constants";

export default function LatencyModal({
  themes,
  attempts = 0,
  average_time = "5m40s",
  total_time = "20m",
}) {
  const styles = StyleSheet.create({
    text: {
      color: themes.textColor,
      ...global.p5dark,
      marginBottom: 15,
    },
  });

  return (
    <View>
      <Text style={styles.text}>Trials for today: {attempts}</Text>
      <Text style={styles.text}>Average time: {average_time}</Text>
      <Text style={styles.text}>Total time: {total_time}</Text>
    </View>
  );
}
