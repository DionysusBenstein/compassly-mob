import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function Spinner({ color }) {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={color} />
    </View>
  );
}
