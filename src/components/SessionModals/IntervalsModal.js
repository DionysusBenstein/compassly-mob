import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { global } from "../../constants";
import { displayFloatNumber } from "../../utils/displayFloatNumber";

export default function IntervalsModal({
  themes,
  attempts = 0,
  total_time = 0,
  intervals,
}) {
  const styles = StyleSheet.create({
    text: {
      color: themes.textColor,
      ...global.p5dark,
      marginBottom: 15,
    },
  });

  getStatistic = () => {
    let summ = intervals.positive + intervals.negative;
    let interval = summ ? (intervals.positive / summ) * 100 : 0;

    return displayFloatNumber(interval) + "%";
  };

  return (
    <View>
      <Text style={styles.text}>Trials for today: {attempts}</Text>
      <Text style={styles.text}>
        Total time of trials for today: {total_time}
      </Text>
      <Text style={styles.text}>
        % of successfull intervals: {getStatistic()}
      </Text>
    </View>
  );
}
