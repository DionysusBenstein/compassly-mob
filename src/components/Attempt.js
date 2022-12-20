import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ArrowRight, gradientBorder2 } from "../assets/icons";
import { SvgXml } from "react-native-svg";
import { toTwelweHour } from "../utils/changeTimeFormat";

const displayTime = (time) => {
  if (time) {
    let timeArr = time.split(":");
    return toTwelweHour(timeArr[0], timeArr[1]);
  } else {
    return "";
  }
};

export default Attempt = ({ el, client, navigation }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <View style={elStyles.attempt}>
      <View style={elStyles.item}>
        <View style={elStyles.time}>
          {console.log(el.start_time)}
          <Text style={elStyles.timeValue}>{displayTime(el.start_time)}</Text>
          <Text style={elStyles.timeDash}>-</Text>
          <Text style={elStyles.timeValue}>{displayTime(el.end_time)}</Text>
        </View>
        <View style={elStyles.info}>
          <View style={elStyles.infoBlock}>
            <Text style={elStyles.infoName}>
              {el.doctor.name + " " + el.doctor.surname}
            </Text>
            <Text style={elStyles.infoName}>
              {el.patient.name + " " + el.patient.surname}
            </Text>
          </View>
          <View style={elStyles.infoBlock}>
            <Text style={elStyles.infoRole}>therapist</Text>
            <Text style={elStyles.infoRole}>client</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setClicked(true);
            let interval = setInterval(() => {
              !clicked &&
                navigation.navigate("AttemptHistory", {
                  client: client,
                  attempts: el.skills,
                  startTime: el.start_time,
                });
              clearInterval(interval);
            }, 1);
          }}
          style={{ marginLeft: "auto" }}
        >
          <View style={elStyles.openButton}>
            <View style={[elStyles.openButtonArrow]}>
              {!clicked ? (
                <ArrowRight color={"#FFFFFF"} />
              ) : (
                <ActivityIndicator color="#FFFFFF" />
              )}
            </View>
            <SvgXml xml={gradientBorder2} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const elStyles = StyleSheet.create({
  attempt: {
    borderBottomWidth: 1,
    borderBottomColor: "#585A71",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  item: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    marginRight: 15,
    // width: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  timeValue: {
    textAlign: "center",
    color: "#FFFFFF",
    ...global.h5dark,
  },
  timeDash: {
    marginTop: -5,
    marginBottom: -3,
    color: "#FFFFFF",
    textAlign: "center",
  },
  info: {
    flexDirection: "row",
  },
  infoBlock: {
    marginBottom: 2,
  },
  infoName: {
    ...global.p5dark,
    color: "#FFFFFF",
    marginRight: 10,
  },
  infoRole: {
    ...global.p5dark,
    color: "#FFFFFF",
    opacity: 0.4,
  },
  openButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  openButtonArrow: {
    position: "absolute",
  },
});
