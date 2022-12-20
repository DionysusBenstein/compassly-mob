import React from "react";
import { Svg, Path } from "react-native-svg";

export default function Eye({ color }) {
  return (
    <Svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.5226 12.7749C13.7866 13.4438 12.8151 13.793 11.8217 13.7457C10.8283 13.6983 9.89445 13.2583 9.22547 12.5224C8.55648 11.7866 8.20721 10.8151 8.25447 9.82169C8.30173 8.82831 8.74165 7.89438 9.47747 7.22533"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.86842 6.96302C10.7 6.41754 11.7142 6.22467 12.688 6.42684C13.6617 6.62911 14.5152 7.20983 15.0608 8.04135C15.6064 8.87277 15.7993 9.88696 15.5972 10.8607C15.395 11.8345 14.8144 12.6881 13.9829 13.2337"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.70887 3.49667C3.70887 5.49667 1.20887 10.0575 1.20887 10.0575C1.20887 10.0575 4.20887 16.8068 11.7089 16.8068C14.6454 16.8068 17.4999 15.5001 19.4999 14.0001"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.5001 14C21.5441 12.1693 22.5 10 22.5 10C22.5 10 19.5 3.24931 12 3.24931C11.3504 3.24825 10.7019 3.30106 10.0611 3.4072"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
