import React, { useEffect, useState } from "react";
import { View, ImageBackground, ActivityIndicator } from "react-native";
import { getTheme } from "../api/asyncStorage/theme";
import authOperations from "../redux/auth/authOperations";
import { connect } from "react-redux";
// import bgLight from "../assets/img/splash-bg-light.png";
import bgDark from "../assets/img/splash-bg-dark.png";
import { get } from "../api/get";
import { getToken } from "../api/asyncStorage/token";
import { logo } from "../assets/icons";
import { SvgXml } from "react-native-svg";
import { ErrorModal } from "../components";

function Splash({
  setTheme,
  navigation,
  isConnected,
  error,
  setError,
  getCurrentUser,
}) {
  const [appTheme, setAppTheme] = useState();
  const getThemeFromStorage = async () => {
    const theme = await getTheme();
    if (theme) {
      setAppTheme(theme);
      setTheme(theme);
    } else {
      setAppTheme("dark");
      setTheme("dark");
    }
  };

  const checkConnection = async () => {
    const token = await getToken();
    const res = await get("/init");
    if (!res.error) {
      token && getCurrentUser(token);
      navigation.reset({
        routes: [{ name: token ? "General" : "Home" }],
      });
    } else {
      !error && setError({ message1: "Error: No connection with server" });
    }
  };

  useEffect(() => {
    if (isConnected || !error) {
      checkConnection();
    }

    getThemeFromStorage();
  }, [error]);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={bgDark}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      >
        <View>
          <SvgXml xml={logo} style={{ marginBottom: 72 }} />

          <ActivityIndicator
            style={{ transform: [{ scale: 1.25 }] }}
            color={
              appTheme === "dark"
                ? "rgba(255,255,255, 0.7)"
                : "rgba(36,36,36, 0.7)"
            }
          />
        </View>
      </ImageBackground>
      <ErrorModal error={error} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, {
  setTheme: authOperations.getTheme,
  setError: authOperations.setError,
  getCurrentUser: authOperations.getCurrentUser,
})(Splash);
