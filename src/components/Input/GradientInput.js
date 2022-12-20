import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Gradient from "../Gradient/Gradient";
import { global, COLORS } from "../../constants";

export default function GradientInput({
  width,
  height,
  placeholder,
  placeholderTextColor,
  error,
  borderWidth = 1,
  onChangeText,
  onBlur,
  theme,
  value,
}) {
  const styles = StyleSheet.create({
    wrap: {
      width,
      height,
      position: "relative",
    },
    input: {
      backgroundColor: "red",
      height: height - borderWidth * 2,
      width: width - borderWidth * 2,
      overflow: "hidden",
      position: "absolute",
      left: borderWidth,
      top: borderWidth,
    },
  });

  return (
    <View
      style={[
        styles.wrap,
        {
          overflow: "hidden",
          borderRadius: 12,
        },
      ]}
    >
      <Gradient
        style={theme === "dark" ? "transparentWhite" : "transparentBlack"}
      />
      <TextInput
        style={[
          global.textInput,
          !error && styles.input,
          error && global.textInputError,
          { color: theme === "dark" ? COLORS.white : COLORS.dark },
          { backgroundColor: theme === "dark" ? "#2F3547" : "#F0F2F8" },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={true}
      />
    </View>
  );
}
