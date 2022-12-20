import React from "react";
import { Svg, Path } from "react-native-svg";

export default function ArrowLeft({ color }) {
  return (
    <Svg
      width="10"
      height="14"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.28333 1L1.28333 6L5.28333 11"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
