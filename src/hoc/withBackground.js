import React, { Component, useState } from "react";
import { View, ImageBackground, Appearance } from "react-native";
import { Gradient } from "../components";
import mainBackground from "../assets/img/main-background.png";
import backgroundLightCircles from "../assets/img/background-light-circles.png";
import { connect } from "react-redux";
import authSelectors from "../redux/auth/authSelectors";
import darkTheme from "../constants/darkTheme";
import lightTheme from "../constants/lightTheme";

function withBackground(WrappedComponent) {
  // console.log(route.name);
  class withBg extends Component {
    state = {
      themes: { ...darkTheme },
    };

    componentDidMount() {
      this.setState({
        themes:
          this.props.theme === "dark" ? { ...darkTheme } : { ...lightTheme },
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.theme !== this.props.theme) {
        this.setState({
          themes:
            this.props.theme === "dark" ? { ...darkTheme } : { ...lightTheme },
        });
      }
    }

    render() {
      return (
        <View style={{ flex: 1, position: "relative" }}>
          {this.props.theme === "dark" && <Gradient style="darkAshPurple" />}
          <ImageBackground
            source={mainBackground}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", zIndex: 0 }}
          >
            {this.props.theme === "light" ? (
              <ImageBackground
                source={backgroundLightCircles}
                style={{ width: "100%", height: "100%", zIndex: 0 }}
              >
                <WrappedComponent {...this.props} themes={this.state.themes} />
              </ImageBackground>
            ) : (
              <WrappedComponent {...this.props} themes={this.state.themes} />
            )}
          </ImageBackground>
        </View>
      );
    }
  }
  return connect((state) => {
    return { theme: authSelectors.getTheme(state) };
  })(withBg);
}

export default withBackground;
