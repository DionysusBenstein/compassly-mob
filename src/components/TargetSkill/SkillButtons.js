import React from "react";
import {
  View,
  Text,
  Animated,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import timerBg from "../../assets/img/General/timer-bg.png";
import { info } from "../../assets/icons";
import { SvgXml } from "react-native-svg";
import { getTime } from "../../utils/getTime";
import { global } from "../../constants";
import darkTheme from "../../constants/darkTheme";
import { neutralButton, rightButton, wrongButton } from "../../assets/icons";
import { LinearTextGradient } from "react-native-text-gradient";
import { skillTypes } from "./targetSkillConstants";

const buttons = [
  {
    name: "wrong",
    props: {
      style: { ...global.p4dark },
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
    },
    icon: wrongButton,
  },
  {
    name: "neutral",
    props: {
      style: { ...global.p4dark },
      colors: ["#F0F2F8", "#D7D9E1"],
      start: {
        x: 1.4,
        y: 0,
      },
      end: {
        x: -0.14,
        y: 1.6,
      },
      locations: [0.1, 1],
    },
    icon: neutralButton,
  },
  {
    name: "right",
    props: {
      style: { ...global.p4dark },
      colors: ["#DFFF5E", "#51D000", "#00D3C7"],
      start: {
        x: 1,
        y: 0,
      },
      end: {
        x: 0,
        y: 1.2,
      },
      locations: [0, 0.5, 1],
    },
    icon: rightButton,
  },
];

export default function SkillButtons({
  wrong,
  neutral,
  right,
  toggleClock,
  toggle,
  time,
  skill,
  openInfo,
  add,
  type,
  scale,
}) {
  const beh = { wrong, neutral, right };

  const renderButton = (el) => {
    return (
      <TouchableOpacity
        style={styles.textBlock}
        onPress={() => add(el.name)}
        key={el.name}
      >
        <SvgXml xml={el.icon} style={styles.textButton} />
        <LinearTextGradient {...el.props}>
          <Text>{beh[el.name]}</Text>
        </LinearTextGradient>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      style={[
        styles.buttonBlock,
        {
          transform: [
            {
              scale: scale,
            },
          ],
        },
      ]}
    >
      {skill.action_type !== skillTypes.TYPE_3 && (
        <TouchableOpacity style={styles.button} onPress={toggleClock}>
          <ImageBackground
            blurRadius={1}
            source={timerBg}
            style={styles.timerBg}
          >
            <View style={styles.clockTextWrap}>
              <Text style={[global.p5White, styles.clockText]}>
                {toggle ? (type === "watch" ? "Stop" : "Cancel") : "Start"}
              </Text>
            </View>
            <Text style={[global.p4White, styles.clockTime]}>
              {getTime(time)}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      )}

      {skill.action_type === skillTypes.TYPE_3 && (
        <View style={styles.buttonGroup}>
          {buttons.map((el) => renderButton(el))}
        </View>
      )}
      <TouchableOpacity onPress={openInfo} style={styles.openInfo}>
        <SvgXml
          xml={info}
          stroke={darkTheme.textColor}
          fill={darkTheme.textColor}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  openInfo: {
    left: 7,
  },
  textBlock: {
    width: 57,
    height: 57,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timerBg: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonBlock: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    height: 62,
    position: "absolute",
  },
  button: {
    width: 196,
    marginRight: 8,
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  textButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonGroup: { flexDirection: "row", paddingLeft: 5 },
  clockText: {
    justifyContent: "center",
    alignItems: "center",
  },
  clockTextWrap: {
    borderRightColor: "rgba(255,255,255,0.35)",
    borderRightWidth: 1,
    paddingRight: 22,
    paddingHorizontal: 5,
    marginLeft: 23,
    marginRight: 27,
  },
});
