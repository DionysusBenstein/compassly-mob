import React, { Component } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

export default class Gradient extends Component {
  state = {
    colors: ["#FFFFFF", "#000000"],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
    locations: [0, 1],
  };

  componentDidMount() {
    this.chooseGradient(this.props.style);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.style !== this.props.style) {
      this.chooseGradient(this.props.style);
    }
  }

  chooseGradient = (style) => {
    switch (style) {
      case "skyBlue":
        this.setState({
          colors: ["rgba(60, 180, 255, 1)", "#0017E3"],
          start: {
            x: 1.4,
            y: 0,
          },
          end: {
            x: -0.14,
            y: 1.6,
          },
          locations: [0, 1],
        });
        break;
      case "pinkSunset":
        this.setState({
          colors: ["#FFDE2E", "#F300AF"],
          start: {
            x: 1.4,
            y: 0,
          },
          end: {
            x: -0.14,
            y: 1.6,
          },
          locations: [0.1, 1],
        });
        break;
      case "orange":
        this.setState({
          colors: ["#FFD43C", "#E32900"],
          start: {
            x: 1.4,
            y: 0,
          },
          end: {
            x: -0.14,
            y: 1.6,
          },
          locations: [0.1, 1],
        });
        break;
      case "mintWave":
        this.setState({
          colors: ["#5CFB75", "#00AAF3"],
          start: {
            x: 1.5,
            y: 0,
          },
          end: {
            x: -0.14,
            y: 1.6,
          },
          locations: [0.1, 1],
        });
        break;
      case "purple":
        this.setState({
          colors: ["#3CFFB9", "#3CF3FF", "#DF00E3"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 0, 1],
        });
        break;
      case "thunder":
        this.setState({
          colors: ["#865DDD", "#1F25A0"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 1],
        });
        break;
      case "darkAshPurple":
        this.setState({
          colors: ["#353B4F", "#171C2D"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 1],
        });
        break;
      case "lightAsh":
        this.setState({
          colors: ["#F0F2F8", "#D7D9E1"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 1],
        });
        break;
      case "darkAshPurple2":
        this.setState({
          colors: ["#353B4F", "#171C2D"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0.6, 1],
        });
        break;
      case "witch":
        this.setState({
          colors: ["#C31432", "#240B36"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 1],
        });
        break;
      case "violet":
        this.setState({
          colors: ["#6A30E3", "#FF9DD8"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });
        break;
      case "morning":
        this.setState({
          colors: ["#7DFFB2", "#FFCF62", "#D24045"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 0.5, 1],
        });
        break;
      case "transparentWhite":
        this.setState({
          colors: ["rgba(192, 188, 232, 0.59)", "rgba(255, 255, 255, 0.04)"],
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });
        break;
      case "transparentWhite2":
        this.setState({
          colors: [
            "rgba(255, 255, 255, 0.13)",
            "rgba(255, 255, 255, 0.03)",
            "rgba(255, 255, 255, 0)",
          ],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 0.5, 1],
        });
        break;
      case "transparentBlack":
        this.setState({
          colors: ["rgba(68, 62, 140, 0.59)", "rgba(37, 31, 99, 0.28)"],
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });
        break;
      case "green":
        this.setState({
          colors: ["#9AF057", "#43A833"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });
        break;
      case "red":
        this.setState({
          colors: ["#FF6060", "#EF2424"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });
        break;
      case "red2":
        this.setState({
          colors: ["rgba(255, 96, 96, 0.6)", "rgba(239, 36, 36, 0.6)"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });
        break;
      case "mediumGray":
        this.setState({
          colors: ["#B7B7B7", "#B7B7B7"],
          start: {
            x: 1,
            y: 1,
          },
          end: {
            x: 0,
            y: 0,
          },
          locations: [1, 1],
        });
        break;
      case "gray":
        this.setState({
          colors: ["#D8D8D8", "#A7A7A7"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });
        break;
      case "magicDust":
        this.setState({
          colors: ["#3CFFB9", "#3CFFD0", "#7F00E3"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 0,
            y: 1.2,
          },
          locations: [0, 0.5, 1],
        });
        break;
      case "darkGreen":
        this.setState({
          colors: ["rgba(56, 239, 125, 0.6)", "rgba(17, 153, 142, 0.6)"],
          start: {
            x: 1,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
          locations: [0, 1],
        });

      default:
        break;
    }
  };
  render() {
    const { colors, start, end, locations } = this.state;
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={colors}
        locations={locations}
        style={[
          styles.gradient,
          {
            borderTopRightRadius: this.props.borderTopRadius,
            borderTopLeftRadius: this.props.borderTopRadius,
            borderBottomRightRadius: this.props.borderBottomRadius,
            borderBottomLeftRadius: this.props.borderBottomRadius,
          },
        ]}
      ></LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});

Gradient.propTypes = {
  style: PropTypes.string,
};
