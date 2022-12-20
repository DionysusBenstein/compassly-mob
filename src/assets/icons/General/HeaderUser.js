import React from "react";
import { Svg, Rect, Defs, LinearGradient, Stop } from "react-native-svg";

export default function HeaderUser() {
  return (
    <Svg
      width="61"
      height="61"
      viewBox="0 0 61 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="6"
        y="6"
        width="50"
        height="50"
        rx="25"
        fill="url(#paint0_linear_1218_16000)"
      />
      <Rect
        opacity="0.5"
        x="3.5"
        y="3.5"
        width="55"
        height="55"
        rx="27.5"
        stroke="white"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1218_16000"
          x1="23.5743"
          y1="0.183169"
          x2="22.9554"
          y2="81.7426"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6A30E3" />
          <Stop offset="1" stopColor="#FF9DD8" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
