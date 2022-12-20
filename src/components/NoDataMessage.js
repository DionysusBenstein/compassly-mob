import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { sad } from "../assets/icons";
import { SvgXml } from "react-native-svg";
import { global } from "../constants";

export default function NoDataMessage({
  text,
  themes,
  header = " It feels a little empty here.",
  style = {},
}) {
  const styles = StyleSheet.create({
    text1: {
      color: themes.alternativeColor,
      marginTop: 30,
      marginBottom: 30,
    },
    text2: {
      color: themes.alternativeColor,
    },
  });

  return (
    <View
      style={[
        {
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SvgXml xml={sad} fill={themes.textColor} />
        <Text style={[global.h4dark, styles.text1]}>{header}</Text>
        <Text style={[global.h5dark, styles.text2]}>{text}</Text>
      </View>
    </View>
  );
}
