import React from "react";
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import { BaseButton, RectButton } from "react-native-gesture-handler";

export default function BackButton({ goBack }) {
  return (
    <BaseButton
      rippleColor="transparent"
      hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
      onPress={goBack}
      style={{
        position: "absolute",
        top: -44,
        zIndex: 1000,
        left: 0,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
      }}
    >
      <ArrowLeft color="#FFFFFF" />
    </BaseButton>
  );
}
