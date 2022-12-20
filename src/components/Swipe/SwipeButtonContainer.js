// @flow
import React from "react";
import { Animated } from "react-native";

export default class SwipeButtonsContainer extends React.Component {
  render() {
    const { style, children, ...other } = this.props;

    return (
      <Animated.View style={style} {...other}>
        {children}
      </Animated.View>
    );
  }
}
