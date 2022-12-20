import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Gradient from "../Gradient/Gradient";
import { global, COLORS } from "../../constants";

export default function Input({
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
      backgroundColor: "transparent",
      height: height,
      width: width,
      overflow: "hidden",
      borderWidth: 1,
      borderColor:
        theme === "dark" ? "rgba(255,255,255, 0.2)" : "rgba(0,0,0, 0.2)",
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
      <TextInput
        style={[
          global.textInput,
          !error && styles.input,
          { color: theme === "dark" ? COLORS.white : COLORS.dark },
          error && global.textInputError,
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
