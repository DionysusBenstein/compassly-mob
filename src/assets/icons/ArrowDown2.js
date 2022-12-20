import React from "react";
import { Svg, Path } from "react-native-svg";

export default function ArrowDown2({ color = "#FFFFFF" }) {
  return (
    <Svg
      width="13"
      height="7"
      viewBox="0 0 13 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11.5 1.2168L6.5 5.2168L1.5 1.2168"
        stroke-width="1.6"
        stroke-miterlimit="5"
        stroke-linecap="round"
        stroke={color}
      />
    </Svg>
  );
}
