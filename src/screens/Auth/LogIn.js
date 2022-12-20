import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import withBackground from "../../hoc/withBackground";
import withKeyboard from "../../hoc/withKeyboard";
import { COLORS, global, SIZES } from "../../constants";
import AuthPanel from "./AuthPanel";
import { setToken } from "../../api/asyncStorage/token";
import { LogoText, fingerprint } from "../../assets/icons";
import { SvgXml } from "react-native-svg";
import SaveAttempt from "../../components/SessionModals/SaveAttempt";
import {
  BlurredInput,
  BlurredPasswordInput,
  CustomButton,
  Gradient,
} from "../../components";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";
import { Panel } from "../../components/Panel/Panel";
import { post } from "../../api/post";
import authOperations from "../../redux/auth/authOperations";
import { Formik } from "formik";
import enterEmailSchema from "../../validationSchemas/enterEmailSchema";
import KeyboardListener from "react-native-keyboard-listener";
import { useIsFocused } from "@react-navigation/native";
// import { useBiometricAuth } from "../../hooks/useBiometricAuth";
import ReactNativeBiometrics from "react-native-biometrics";
import { useBiometricsIsEnabled } from "../../hooks/useBiometricsIsEnabled";
import { biometrics } from "../../api/asyncStorage/biometricAuth";
import base64 from "react-native-base64";
import axios from "axios";

function LogIn({
  navigation,
  setError,
  clearError,
  error,
  theme,
  themes,
  addToken,
  getCurrentUser,
}) {
  const [userId, setUserId] = useState("");
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onlyLarge: true,
    showCloseButton: false,
    scrollViewProps: {
      bounces: 0,
      showsVerticalScrollIndicator: false,
    },
    // closeOnTouchOutside: true,
    style: {
      backgroundColor: "transparent",
      height: SIZES.height * 0.86,
    },
    barStyle: {
      backgroundColor: "#B7B7B7",
      width: 21,
      height: 2,
    },
    noBackgroundOpacity: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [password, setPassword] = useState("");
  const [activeScreen, setActiveScreen] = useState(2);
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  const [showFingerprint, setShowFingerPrint] = useState(false);
  const [biometricsCanBeEnabled, setBiometricsCanBeEnabled] = useState(false);
  const [biometricsModal, setBiometricsModal] = useState(false);

  const mTop = useRef(new Animated.Value(SIZES.height * 0.14)).current;
  const isFocused = useIsFocused();

  const goToMainScreen = () => {
    navigation.reset({
      routes: [{ name: "General" }],
    });
  };

  useEffect(() => {
    if (keyboardIsShown) {
      Animated.timing(mTop, {
        toValue: 15,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(mTop, {
        toValue: SIZES.height * 0.14,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [keyboardIsShown]);

  // function to close swipe panel
  const closePanel = () => {
    setIsPanelActive(false);
  };

  // swipe panel submit handler
  const handleSubmit = (txt) => {
    if (activeScreen === 2) {
      setPassword(txt);
      setActiveScreen(3);
      return;
    }

    if (activeScreen === 3) {
      console.log("phone number", txt);
      onRegister(txt);
      return;
    }
  };

  // swipe panel back button handler
  const goToPreviousScreen = () => {
    setActiveScreen((prevState) => prevState - 1);
  };

  // close panel when screen is 1
  useEffect(() => {
    if (activeScreen === 1) {
      setIsPanelActive(false);
    }
  }, [activeScreen]);

  // button color depends to form values
  const buttonColor = (isValid, values) => {
    return !isValid || !values.email
      ? theme === "dark"
        ? COLORS.mediumGray
        : COLORS.darkGray
      : COLORS.white;
  };

  // button backgroundcolor depends to form values
  const buttonBackgroundColor = (isValid, values) => {
    return !isValid || !values.email
      ? theme === "dark"
        ? COLORS.darkAshPurple
        : COLORS.mediumGray
      : null;
  };

  // setting static token while we don't have deeplinks
  let token =
    "cc375877d27f55d2a60d472b9efa362791a052bc875fe699bcd4676a13f1c49c";

  // sending password and number to receive otp
  const onRegister = async (number) => {
    console.log("number", number);
    const formdata = new FormData();
    formdata.append("number", number);
    formdata.append("password", password);
    formdata.append("token", token);
    let res = await post("/register", formdata);

    if (!res.result.err) {
      setUserId(res.result.user_id);
      setActiveScreen(4);
    } else {
      console.log("err", res.result);
      if (res.result.msg === "User with not registered!") {
        setError({
          message1: "Registration link is wrong!",
          message2: "Make sure you have right link and try once again.",
        });
      } else {
        setError({
          message1: "Wrong number!",
          message2: "Make sure the number exists and try typing it once again.",
        });
      }
    }
  };

  const logInSuccess = async (token) => {
    getCurrentUser(token);
    addToken(token);
    await setToken(token);

    biometricsCanBeEnabled ? setBiometricsModal(true) : goToMainScreen();

    clearError();
  };

  const biometricLogIn = async (deviceId) => {
    console.log("devceid ==>", deviceId);
    let res = await post(`/auth/${deviceId}`);
    console.log(res);
    if (!res.result.err) {
      logInSuccess(res.result.token);
    } else {
      setError({
        message1: "Error with biometric auth. Another device is connected.",
      });
      biometrics.disable();
      biometrics.remove();
      setShowFingerPrint(false);
    }
  };

  // log in function
  const logIn = async (values) => {
    const formdata = new FormData();
    formdata.append("email", values.email);
    formdata.append("password", values.password);
    let res = await post("/auth", formdata);

    if (!res.result.err) {
      logInSuccess(res.result.token);
    } else {
      setError({
        message1:
          "The email you entered isn't registered in the system. Please, check it or contact the admin if you have questions",
      });
    }
  };

  useEffect(() => {
    clearError();
  }, [isFocused]);

  const bio = useBiometricsIsEnabled();

  useEffect(() => {
    bio.enabled === "can be enabled" && setBiometricsCanBeEnabled(true);

    if (bio.enabled === true) {
      bio.type === "Biometrics" && setShowFingerPrint(true);
      createSignature();
    }
  }, [bio.enabled]);

  const createSignature = () => {
    ReactNativeBiometrics.createSignature({
      promptMessage: "Sign in",
      payload: "",
    }).then((resultObject) => {
      const { success, signature } = resultObject;
      if (success) {
        biometrics.enable();
        const deviceId = base64.encode(signature);

        if (biometricsCanBeEnabled) {
          postBiometrics(deviceId);
        } else {
          biometricLogIn(deviceId);
        }
      }
    });
  };

  const enableBiometrics = () => {
    createKey();
    setBiometricsModal(false);
  };

  const disableBiometrics = () => {
    setBiometricsModal(false);
    biometrics.disable();
    goToMainScreen();
  };

  const postBiometrics = async (deviceId) => {
    console.log("asdasdasdasd");
    const res = await post(`biometrics/${deviceId}`);
    console.log("postbiometrics res==>", res.result);

    goToMainScreen();
  };

  const createKey = async () => {
    await ReactNativeBiometrics.createKeys("Confirm fingerprint").then(
      (resultObject) => {
        const { publicKey } = resultObject;
        createSignature();
        console.log(resultObject);
      }
    );
  };

  return (
    <SafeAreaView style={[global.container, styles.container]}>
      <View style={styles.logo}>
        <SvgXml xml={LogoText} />
      </View>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={"padding"}>
        <KeyboardListener
          onDidShow={() => {
            Platform.OS === "android" && setKeyboardIsShown(true);
          }}
          onDidHide={() => {
            Platform.OS === "android" && setKeyboardIsShown(false);
          }}
          onWillShow={() => {
            setKeyboardIsShown(true);
          }}
          onWillHide={() => {
            setKeyboardIsShown(false);
          }}
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={enterEmailSchema}
          onSubmit={(values) => logIn(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <View>
                  <View style={[global.inputGroup, styles.inputGroup]}>
                    <BlurredInput
                      theme={theme}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="Email Adress"
                      placeholderTextColor={themes.placeholderTextColor}
                      error={error}
                    />
                  </View>
                  <View style={[global.inputGroup, styles.inputGroup]}>
                    <BlurredPasswordInput
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      eyeColor={themes.eyeColor}
                      placeholder="Password"
                      placeholderTextColor={themes.placeholderTextColor}
                      theme={theme}
                      error={error}
                    />
                  </View>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end", marginRight: 27 }}
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={[global.p5dark, styles.forgotPassword]}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <Animated.View
                  style={{
                    width: "100%",
                    marginTop: mTop,
                    marginBottom: Platform.OS === "android" ? 40 : 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                      marginBottom: 100,
                      marginTop: -50,
                    }}
                    onPress={() => createSignature()}
                  >
                    {showFingerprint && !keyboardIsShown && (
                      <SvgXml xml={fingerprint} />
                    )}
                  </TouchableOpacity>

                  <CustomButton
                    disabled={!isValid || !values.email}
                    gradient="thunder"
                    color={COLORS.white}
                    onPress={handleSubmit}
                    backgroundColor={buttonBackgroundColor(isValid, values)}
                    color={buttonColor(isValid, values)}
                    arrowRight
                  />
                </Animated.View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>

      <Panel
        {...panelProps}
        isActive={isPanelActive}
        theme={theme}
        goBack={goToPreviousScreen}
        activeScreen={activeScreen}
      >
        <Gradient
          style={theme === "dark" ? "darkAshPurple" : "lightAsh"}
          borderTopRadius={20}
        />
        <AuthPanel
          userId={userId}
          goBack={goToPreviousScreen}
          theme={theme}
          themes={themes}
          handleSubmit={handleSubmit}
          activeScreen={activeScreen}
          navigation={navigation}
          closePanel={closePanel}
        />
      </Panel>
      {biometricsModal && (
        <SaveAttempt
          themes={themes}
          showModal={biometricsModal}
          closeModal={disableBiometrics}
          onCancel={disableBiometrics}
          text={"Do you want to enable biometric log in?"}
          confirmText="Enable"
          cancelText="Disable"
          onSubmit={enableBiometrics}
          cancelColor={COLORS.red}
          confirmGradient={"thunder"}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    marginTop: -10,
    marginBottom: 85,
  },
  logo: {
    marginTop: SIZES.height * 0.17,
  },
  keyboardView: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  subtitle: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  forgotPassword: {
    color: COLORS.darkGray,
  },
});

export default connect(
  (state) => {
    return {
      error: authSelectors.getError(state),
    };
  },
  {
    getCurrentUser: authOperations.getCurrentUser,
    setError: authOperations.setError,
    clearError: authOperations.clearError,
    addToken: authOperations.setToken,
  }
)(withKeyboard(withBackground(LogIn)));
