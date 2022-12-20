import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { checked } from "../assets/icons";
import { COLORS, global } from "../constants";

export default function CustomCheckbox({ value, onChange, theme = "black" }) {
  return (
    <TouchableOpacity
      hitSlop={global.hitslopMedium}
      style={[
        styles.checkbox,
        {
          backgroundColor: "transparent",
          borderColor: COLORS.white,
        },
      ]}
      onPress={onChange}
    >
      {value && <SvgXml xml={checked} stroke={"#FFFFFF"} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
