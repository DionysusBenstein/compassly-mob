import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { global, COLORS } from "../../constants";
import Gradient from "../Gradient/Gradient";
import { ArrowRight, ArrowLeft } from "../../assets/icons";

export default function CustomButton({
  gradient = "darkAshPurple",
  color = `${COLORS.mediumGray}`,
  onPress,
  backgroundColor = null,
  text = "Proceed",
  arrowLeft,
  arrowRight,
  disabled,
  loading,
}) {
  return (
    <TouchableOpacity
      style={{ width: "100%" }}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          global.button,
          { backgroundColor, alignItems: "center", flexDirection: "row" },
        ]}
      >
        {!backgroundColor && <Gradient style={gradient} />}
        {arrowLeft && (
          <View style={{ marginRight: 10 }}>
            <ArrowLeft color={color} />
          </View>
        )}
        {loading ? (
          <ActivityIndicator color={color} />
        ) : (
          <Text style={[global.p5dark, { color }]}>{text}</Text>
        )}
        {arrowRight && (
          <View
            style={{
              marginLeft: 10,
              paddingTop: Platform.OS === "android" ? 3 : 0,
            }}
          >
            <ArrowRight color={color} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
