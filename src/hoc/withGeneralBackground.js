import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import bgDark from "../assets/img/General/background-dark.png";
import bgLight from "../assets/img/General/background-light.png";
import { connect } from "react-redux";
import authSelectors from "../redux/auth/authSelectors";
import darkTheme from "../constants/darkTheme";
import lightTheme from "../constants/lightTheme";

function withGeneralBackground(WrappedComponent) {
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
      const { theme } = this.props;
      const { themes } = this.state;
      return (
        <View style={{ flex: 1, position: "relative" }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={theme === "dark" ? bgDark : bgLight}
          >
            <WrappedComponent {...this.props} theme={theme} themes={themes} />
          </ImageBackground>
        </View>
      );
    }
  }
  return connect((state) => {
    return { theme: authSelectors.getTheme(state) };
  })(withBg);
}

export default withGeneralBackground;
