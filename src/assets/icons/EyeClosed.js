import React from "react";
import { View } from "react-native";
import { Svg, Path } from "react-native-svg";

export default function EyeClosed({ color }) {
  return (
    <View>
      <Svg
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M4.5 1.75L19.5 18.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.5224 12.7747C13.7864 13.4436 12.8149 13.7928 11.8215 13.7455C10.8281 13.6981 9.89422 13.2581 9.22524 12.5222C8.55625 11.7864 8.20698 10.8149 8.25424 9.82146C8.3015 8.82808 8.74142 7.89415 9.47724 7.2251"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.93698 4.43066C3.11486 6.36618 1.5 10 1.5 10C1.5 10 4.5 16.7493 12 16.7493C13.7572 16.7633 15.4926 16.3585 17.0623 15.5685"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.557 13.8533C21.601 12.0226 22.4999 10.0002 22.4999 10.0002C22.4999 10.0002 19.4999 3.24953 11.9999 3.24953C11.3503 3.24847 10.7018 3.30128 10.061 3.40742"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.7056 6.31641C13.5026 6.46946 14.2286 6.8768 14.7745 7.47735C15.3204 8.07789 15.6569 8.83925 15.7335 9.64723"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
