import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { global } from "../constants";
import { gradientBorder } from "../assets/icons";

export default function ClientsList({
  clients,
  themes,
  navigation,
  setActiveUser,
}) {
  const styles = StyleSheet.create({
    client: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 23,
      paddingRight: 18,
      paddingVertical: 23,
      borderBottomColor: themes.listBorderColor,
      borderBottomWidth: 1,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 15,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "rgba(37, 42, 61, 0.5)",
    },
    icon: { position: "absolute" },
    buttonText: {
      position: "absolute",
      ...global.p5White,
    },
  });

  return (
    <View>
      {clients.map((client) => {
        return (
          <View key={client.number} style={styles.client}>
            <TouchableOpacity
              onPress={() => {
                setActiveUser(client);
                navigation.navigate("Planner");
              }}
            >
              <Text
                style={[
                  global.p5dark,
                  styles.clientText,
                  { color: themes.textColor },
                ]}
              >
                {client.name} {client.surname}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setActiveUser(client);
                  navigation.navigate("Sessions", {
                    id: client.client_id,
                    name: client.name,
                    surname: client.surname,
                  });
                }}
              >
                <SvgXml xml={gradientBorder} />
                <Text
                  style={{
                    ...global.p5dark,
                    color: themes.textColor,
                    position: "absolute",
                  }}
                >
                  Start session
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}
