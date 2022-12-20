import React from "react";
import { View, TextInput, Platform } from "react-native";
import Blur from "../Blur/Blur";
import { global, COLORS } from "../../constants";

export default function BlurredInput(props) {
  return (
    <View style={{ width: "100%", overflow: "hidden", borderRadius: 12 }}>
      {Platform.OS === "ios" && <Blur />}
      <TextInput
        style={[
          global.textInput,
          { color: props.theme === "dark" ? COLORS.white : COLORS.dark },
          props.error && global.textInputError,
          {
            backgroundColor:
              Platform.OS !== "ios"
                ? props.theme === "dark"
                  ? "rgba(0,0,0, 0.4)"
                  : "rgba(255,255,255, 0.4)"
                : "transparent",
          },
        ]}
        {...props}
      />
    </View>
  );
}
