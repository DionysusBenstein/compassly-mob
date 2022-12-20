import React from "react";
import { ClipPath } from "react-native-svg";
import { Svg, Path, Image } from "react-native-svg";

export const ProfileOctagon = ({ image }) => {
  return (
    <Svg
      width="79"
      height="94"
      viewBox="0 0 123 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Image
        href={image}
        clipPath="url(#clip)"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />

      <ClipPath id="clip">
        <Path
          d="M0 43.3632C0 37.9439 2.92319 32.9459 7.64668 30.2893L54.1467 4.1358C58.7126 1.56776 64.2874 1.56776 68.8533 4.1358L115.353 30.2893C120.077 32.9459 123 37.9439 123 43.3632V90.7019C123 95.7665 120.444 100.489 116.204 103.259L69.7043 133.64C64.7196 136.897 58.2804 136.897 53.2957 133.64L6.79569 103.259C2.55576 100.489 0 95.7665 0 90.7019L0 43.3632Z"
          fill="white"
        />
      </ClipPath>
      <Path
        opacity="0.1"
        d="M0 43.3632C0 37.9439 2.92319 32.9459 7.64668 30.2893L54.1467 4.1358C58.7126 1.56776 64.2874 1.56776 68.8533 4.1358L115.353 30.2893C120.077 32.9459 123 37.9439 123 43.3632V90.7019C123 95.7665 120.444 100.489 116.204 103.259L69.7043 133.64C64.7196 136.897 58.2804 136.897 53.2957 133.64L6.79569 103.259C2.55576 100.489 0 95.7665 0 90.7019L0 43.3632Z"
        fill="white"
      />
    </Svg>
  );
};
