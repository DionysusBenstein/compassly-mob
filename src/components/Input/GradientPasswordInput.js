import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Gradient from "../Gradient/Gradient";
import { global, COLORS } from "../../constants";
import { Eye, EyeClosed } from "../../assets/icons";

export default function GradientPasswordInput({
  width = 100,
  height = 50,
  placeholder,
  placeholderTextColor,
  error,
  borderWidth = 1,
  eyeColor = "#FFFFFF",
  onChangeText,
  onBlur,
  theme,
  value,
}) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    secureTextEntry ? setSecureTextEntry(false) : setSecureTextEntry(true);
  };

  const styles = StyleSheet.create({
    wrap: {
      width,
      height,
      position: "relative",
      justifyContent: "center",
    },
    input: {
      height: height - borderWidth * 2,
      width: width - borderWidth * 2,
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
        secureTextEntry={secureTextEntry}
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
      />
      <TouchableOpacity
        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
        style={{ position: "absolute", right: "6%" }}
        onPress={toggleSecureEntry}
      >
        {secureTextEntry ? (
          <Eye color={eyeColor} />
        ) : (
          <EyeClosed color={eyeColor} />
        )}
      </TouchableOpacity>
    </View>
  );
}
