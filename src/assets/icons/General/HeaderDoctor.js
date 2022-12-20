import React from "react";
import {
  Svg,
  Path,
  G,
  Defs,
  Rect,
  Stop,
  LinearGradient,
  ClipPath,
  Image,
} from "react-native-svg";

export default function HeaderDoctor({ image }) {
  return (
    <Svg
      width="57"
      height="61"
      viewBox="0 0 57 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_1218_15994)">
        <Path
          d="M24.6476 58.1096L4.46278 45.0169C2.61513 43.8185 1.5 41.7659 1.5 39.5637V19.2884C1.5 16.9329 2.77439 14.7617 4.83102 13.6133L25.0158 2.34221C26.9853 1.24244 29.3842 1.24244 31.3538 2.34221L51.5385 13.6133C53.5952 14.7617 54.8696 16.9329 54.8696 19.2884V39.5637C54.8696 41.7659 53.7544 43.8185 51.9068 45.0169L31.722 58.1096C29.5704 59.5053 26.7992 59.5053 24.6476 58.1096Z"
          stroke="white"
          stroke-opacity="0.5"
        />
        <G filter="url(#filter0_d_1218_15994)">
          <Path
            d="M4.69995 19.3851C4.69995 17.5533 5.70161 15.8682 7.31073 14.9929L25.6947 4.99256C27.1773 4.18609 28.9667 4.18198 30.453 4.98163L49.069 14.9975C50.6893 15.8693 51.7 17.5606 51.7 19.4006V39.5344C51.7 41.2811 50.7885 42.9011 49.2957 43.8078L30.6809 55.1146C29.0785 56.088 27.0663 56.0831 25.4686 55.1019L7.08338 43.8112C5.60241 42.9017 4.69995 41.2884 4.69995 39.5505V19.3851Z"
            fill="url(#paint0_linear_1218_15994)"
          />
          {image && (
            <Image
              href={image}
              clipPath="url(#image-path)"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          )}
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1218_15994"
          x1="-16.357"
          y1="-12.0426"
          x2="64.1356"
          y2="59.3377"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#3C95FF" />
          <Stop offset="0.0001" stopColor="#3CB9FF" />
          <Stop offset="1" stopColor="#7F00E3" />
        </LinearGradient>
        <ClipPath id="image-path">
          <Path
            d="M4.69995 19.3851C4.69995 17.5533 5.70161 15.8682 7.31073 14.9929L25.6947 4.99256C27.1773 4.18609 28.9667 4.18198 30.453 4.98163L49.069 14.9975C50.6893 15.8693 51.7 17.5606 51.7 19.4006V39.5344C51.7 41.2811 50.7885 42.9011 49.2957 43.8078L30.6809 55.1146C29.0785 56.088 27.0663 56.0831 25.4686 55.1019L7.08338 43.8112C5.60241 42.9017 4.69995 41.2884 4.69995 39.5505V19.3851Z"
            fill="url(#paint0_linear_1218_15994)"
          />
        </ClipPath>
        <ClipPath id="clip0_1218_15994">
          <Rect width="57" height="61" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
