import React from "react";
import { Svg, Path } from "react-native-svg";

export default function ArrowRight({ color = "#B7B7B7" }) {
  return (
    <Svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1 1L5 6L1 11"
        stroke={color}
        strokeWidth="1.6"
        strokeMiterlimit="5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
