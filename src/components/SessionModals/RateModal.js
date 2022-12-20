import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, global } from "../../constants";
import { displayFloatNumber } from "../../utils/displayFloatNumber";
import { neutralButton, rightButton, wrongButton } from "../../assets/icons";
import { SvgXml } from "react-native-svg";
import { LinearTextGradient } from "react-native-text-gradient";

export default function RateModal({
  themes,
  attempts = "0",
  time = "0m",
  behavior,
  add,
  sub,
  running,
  rate,
}) {
  const styles = StyleSheet.create({
    buttons: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    buttonBlock: {
      flexDirection: "column-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    textButton: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    textBlock: {
      marginVertical: 8,
      width: 57,
      height: 57,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: 33,
      height: 33,
      borderRadius: 17,
      backgroundColor: themes.modalButtonBackground,
      justifyContent: "center",
      alignItems: "center",
      opacity: !running ? 0.5 : 1,
    },
    buttonSign: {
      color: themes.textColor,
    },
    buttonText: {
      marginRight: 9,
      ...global.p5dark,
      color: themes.textColor,
    },
    text: {
      ...global.p5dark,
      color: themes.textColor,
      marginBottom: 15,
    },
  });
  const [beh, setBeh] = useState({ neutral: -1, right: -1, wrong: -1 });

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      setBeh(behavior);
    }, 50);
  }, [behavior]);

  const { neutral, wrong, right } = beh;

  const isButtonDisabled = (value) => {
    if (value === 0) {
      return true;
    } else {
      return false;
    }
  };

  const getPercentage = (value) => {
    const res = rate[value].rate || 0;
    return displayFloatNumber(res);
  };
  return (
    <View>
      <View style={styles.buttons}>
        <View style={styles.buttonBlock}>
          <TouchableOpacity
            disabled={isButtonDisabled(wrong)}
            style={[
              styles.button,
              { opacity: isButtonDisabled(wrong) ? 0.5 : 1 },
            ]}
            onPress={() => {
              sub("wrong");
            }}
          >
            <Text style={styles.buttonSign}>-</Text>
          </TouchableOpacity>

          <View style={styles.textBlock}>
            <SvgXml xml={wrongButton} style={styles.textButton} />
            <LinearTextGradient
              style={{ ...global.p4dark }}
              colors={["#FFDE2E", "#F300AF"]}
              start={{
                x: 1.4,
                y: 0,
              }}
              end={{
                x: -0.14,
                y: 1.6,
              }}
              locations={[0.1, 1]}
            >
              <Text>{wrong}</Text>
            </LinearTextGradient>
          </View>
          <TouchableOpacity
            disabled={!running}
            style={[styles.button]}
            onPress={() => add("wrong")}
          >
            <Text style={styles.buttonSign}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonBlock}>
          <TouchableOpacity
            disabled={isButtonDisabled(neutral)}
            style={[
              styles.button,
              { opacity: isButtonDisabled(neutral) ? 0.5 : 1 },
            ]}
            onPress={() => sub("neutral")}
          >
            <Text style={styles.buttonSign}>-</Text>
          </TouchableOpacity>
          <View style={styles.textBlock}>
            <SvgXml xml={neutralButton} style={styles.textButton} />
            <LinearTextGradient
              style={{ ...global.p4dark }}
              colors={["#F0F2F8", "#D7D9E1"]}
              start={{
                x: 1.4,
                y: 0,
              }}
              end={{
                x: -0.14,
                y: 1.6,
              }}
              locations={[0.1, 1]}
            >
              <Text>{neutral}</Text>
            </LinearTextGradient>
          </View>
          <TouchableOpacity
            disabled={!running}
            style={[styles.button]}
            onPress={() => add("neutral")}
          >
            <Text style={styles.buttonSign}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonBlock}>
          <TouchableOpacity
            disabled={isButtonDisabled(right)}
            style={[
              styles.button,
              { opacity: isButtonDisabled(right) ? 0.5 : 1 },
            ]}
            onPress={() => sub("right")}
          >
            <Text style={styles.buttonSign}>-</Text>
          </TouchableOpacity>
          <View style={styles.textBlock}>
            <SvgXml xml={rightButton} style={styles.textButton} />
            <LinearTextGradient
              style={{ ...global.p4dark }}
              colors={["#DFFF5E", "#51D000", "#00D3C7"]}
              start={{
                x: 1,
                y: 0,
              }}
              end={{
                x: 0,
                y: 1.2,
              }}
              locations={[0, 0.5, 1]}
            >
              <Text>{right}</Text>
            </LinearTextGradient>
          </View>
          <TouchableOpacity
            disabled={!running}
            style={[styles.button]}
            onPress={() => add("right")}
          >
            <Text style={styles.buttonSign}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 22 }}>
        <Text style={styles.text}>Trials for today: {attempts} </Text>
        <Text style={styles.text}>Total time of trials for today: {time} </Text>
        <Text style={styles.text}>
          Rate of <Text style={{ color: COLORS.red }}> incorrect </Text>{" "}
          responses: {getPercentage("wrong")}
        </Text>
        <Text style={styles.text}>
          Rate of <Text style={{ color: COLORS.mediumGray }}> neutral </Text>
          responses: {getPercentage("neutral")}
        </Text>
        <Text style={styles.text}>
          Rate of <Text style={{ color: COLORS.green }}> correct </Text>{" "}
          responses: {getPercentage("right")}
        </Text>
      </View>
    </View>
  );
}
