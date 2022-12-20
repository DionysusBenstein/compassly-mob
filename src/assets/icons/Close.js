import React from "react";
import { Svg, Rect } from "react-native-svg";

export default function Close({ color = "#242424" }) {
  return (
    <Svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="1.41418"
        y="0.237793"
        width="16.9305"
        height="2"
        rx="1"
        transform="rotate(45 1.41418 0.237793)"
        fill={color}
      />

      <Rect
        x="0.321167"
        y="11.9717"
        width="16.9305"
        height="2"
        rx="1"
        transform="rotate(-45 0.321167 11.9717)"
        fill={color}
      />
    </Svg>
  );
}
