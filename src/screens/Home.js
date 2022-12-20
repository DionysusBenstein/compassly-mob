import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Switch,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import withBackground from "../hoc/withBackground";
import { global } from "../constants";
import { LogoText } from "../assets/icons";
import { SvgXml } from "react-native-svg";
import { Blur } from "../components";
import { connect } from "react-redux";
import authOperations from "../redux/auth/authOperations";

function Home({ navigation, theme, themes }) {
  return (
    <SafeAreaView style={[global.container, styles.container]}>
      {themes && (
        <>
          <View style={styles.logo}>
            <SvgXml xml={LogoText} />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LogIn")}
          >
            {Platform.OS === "ios" && <Blur theme={theme} />}
            <Text style={(global.p5dark, { color: themes.textColor })}>
              Log In
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 0,
    marginBottom: 150,
  },
  subtitle: {
    marginTop: 20,
  },
  button: {
    width: "100%",
    height: 51,
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "rgba(255,255, 255, 0.4)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(192, 188, 232, 0.59)",
    marginTop: 78,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(null, { addTheme: authOperations.getTheme })(
  withBackground(Home)
);
