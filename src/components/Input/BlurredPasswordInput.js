import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import Blur from "../Blur/Blur";
import { global, COLORS } from "../../constants";
import { Eye, EyeClosed } from "../../assets/icons";

export default function BlurredInput(props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    secureTextEntry ? setSecureTextEntry(false) : setSecureTextEntry(true);
  };
  return (
    <View
      style={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 12,
        position: "relative",
        justifyContent: "center",
      }}
    >
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
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity
        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
        style={{ position: "absolute", right: "6%" }}
        onPress={toggleSecureEntry}
      >
        {secureTextEntry ? (
          <Eye color={props.eyeColor} />
        ) : (
          <EyeClosed color={props.eyeColor} />
        )}
      </TouchableOpacity>
    </View>
  );
}
