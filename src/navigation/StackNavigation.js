import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, LogIn, ForgotPassword, Splash } from "../screens";
import Downloads from "../screens/General/Therapist/Downloads";
import authOperations from "../redux/auth/authOperations";
import { View } from "react-native";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { COLORS, SIZES } from "../constants";
import { connect } from "react-redux";
import BottomTabNavigation from "./BottomTabNavigation";
import authSelectors from "../redux/auth/authSelectors";
import { ErrorModal } from "../components";
const Stack = createNativeStackNavigator();

const LightTheme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#E4E5EB",
    primary: COLORS.white,
    text: COLORS.dark,
  },
};

const AlternativeTheme = {
  dark: true,
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    text: COLORS.white,
  },
};

function StackNavigation({ theme, isConnected, error }) {
  return (
    <View style={{ width: SIZES.width, height: SIZES.height, flex: 1 }}>
      <NavigationContainer
        theme={theme === "light" ? LightTheme : AlternativeTheme}
      >
        <Stack.Navigator initialRouteName={"Splash"}>
          <Stack.Screen
            name="Splash"
            options={{ headerShown: false, gestureEnabled: false }}
          >
            {(props) => <Splash {...props} isConnected={isConnected} />}
          </Stack.Screen>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="General"
            component={BottomTabNavigation}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Downloads"
            component={Downloads}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ErrorModal error={error} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    error: authSelectors.getError(state),
    theme: authSelectors.getTheme(state),
  };
};

export default connect(mapStateToProps, {
  clearError: authOperations.clearError,
})(StackNavigation);
