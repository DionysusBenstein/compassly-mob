import React from "react";
import { View } from "react-native";
import { Svg, Rect } from "react-native-svg";

export default function Tick({ color }) {
  return (
    <View>
      <Svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Rect
          x="7.41418"
          y="12.2073"
          width="8.36522"
          height="2"
          rx="1"
          transform="rotate(45 7.41418 12.2073)"
          fill={color}
        />
        <Rect
          x="11.0288"
          y="17.7358"
          width="13.7684"
          height="2"
          rx="1"
          transform="rotate(-45 11.0288 17.7358)"
          fill={color}
        />
      </Svg>
    </View>
  );
}
