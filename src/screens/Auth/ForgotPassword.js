import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Platform,
} from "react-native";
import withBackground from "../../hoc/withBackground";
import withKeyboard from "../../hoc/withKeyboard";
import { global, SIZES, THEMES, COLORS } from "../../constants";
import {
  PhoneInput,
  CustomButton,
  Gradient,
  SuccessModal,
} from "../../components";
import { Panel } from "../../components/Panel/Panel";
import ForgotPasswordPanel from "./ForgotPasswordPanel";
import { LogoText } from "../../assets/icons";
import { SvgXml } from "react-native-svg";
import phoneSchema from "../../validationSchemas/phoneSchema";
import { Formik } from "formik";
import { post } from "../../api/post";
import { connect } from "react-redux";
import authOperations from "../../redux/auth/authOperations";
import { put } from "../../api/put";
import KeyboardListener from "react-native-keyboard-listener";

function ForgotPassword({ navigation, theme, themes, setError }) {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      marginTop: SIZES.height * 0.17,
      flex: 0.5,
    },
    header: {
      marginTop: 0,
    },
    subtitle: {
      marginTop: SIZES.height * 0.2,
      textAlign: "center",
      maxWidth: 329,
    },
    button: {
      width: "100%",
      height: 51,
      position: "relative",
      overflow: "hidden",
      borderRadius: 12,
      backgroundColor: "transparent",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgba(192, 188, 232, 0.59)",
      marginTop: 78,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const [userId, setUserId] = useState("");
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeScreen, setActiveScreen] = useState(2);
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const mTop = useRef(new Animated.Value(SIZES.height * 0.2)).current;

  useEffect(() => {
    if (keyboardIsShown) {
      Animated.timing(mTop, {
        toValue: 15,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(mTop, {
        toValue: SIZES.height * 0.2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [keyboardIsShown]);

  const [country, setCountry] = useState({
    name: "United States",
    dial_code: "+1",
    code: "US",
    preferred: true,
    flag: "🇺🇸",
  });

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onlyLarge: true,
    showCloseButton: false,
    scrollViewProps: {
      bounces: 0,
      showsVerticalScrollIndicator: false,
      flex: 1,
    },

    closeOnTouchOutside: true,

    noBar: true,

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

  const goToPreviousScreen = () => {
    setIsPanelActive(false);
  };

  useEffect(() => {
    if (activeScreen === 1) {
      setIsPanelActive(false);
    }
  }, [activeScreen]);

  const buttonColor = (isValid, values) => {
    return !isValid || !values.phone
      ? theme === "dark"
        ? COLORS.mediumGray
        : COLORS.darkGray
      : COLORS.white;
  };

  const buttonBackgroundColor = (isValid, values) => {
    return !isValid || !values.phone
      ? theme === "dark"
        ? COLORS.darkAshPurple
        : COLORS.mediumGray
      : null;
  };

  const toggleShowModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  const toggleShowSuccessModal = () => {
    showSuccessModal ? setShowSuccessModal(false) : setShowSuccessModal(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const handlePressModalButton = () => {
    setShowModal(false);
    setIsPanelActive(true);
  };

  const sendResetCode = async (values) => {
    console.log("forgot password number", country.dial_code + values.phone);
    const formdata = new FormData();
    formdata.append("number", country.dial_code + values.phone);
    const res = await post("/reset-password", formdata);
    console.log("resetpassword ==> res", res);
    if (!res.error) {
      setShowModal(true);
      setUserId(res.result.user_id);
      setPhoneNumber(country.dial_code + values.phone);
    } else {
      setError({
        message1: "Wrong phone number!",
        message2: "Make sure you entered phone number linked to your account.",
      });
    }
  };

  const handleSubmit = async (password) => {
    if (activeScreen === 2) {
      setActiveScreen(3);
    } else if (activeScreen === 3) {
      const formdata = new FormData();
      formdata.append("number", phoneNumber);
      formdata.append("password", password);
      const res = await put("new-password", formdata);
      if (res && !res.error) {
        setShowSuccessModal(true);
      } else {
        console.log("error", res.error);
      }
    }
  };

  return (
    <SafeAreaView style={[global.container, styles.container]}>
      <View style={styles.logo}>
        <SvgXml xml={LogoText} />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "android" ? 20 : 0}
        behavior={"padding"}
        style={{
          width: "100%",
          // flex: 1,
        }}
      >
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
        <View style={{ justifyContent: "space-between" }}>
          <Formik
            validationSchema={phoneSchema}
            initialValues={{ phone: "" }}
            onSubmit={(values) => {
              sendResetCode(values);
              Keyboard.dismiss();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => {
              return (
                <>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[global.p5White, styles.subtitle]}>
                      Type in your phone to recieve a password-reset link.
                    </Text>

                    <View style={{ width: "100%", marginTop: 42 }}>
                      <PhoneInput
                        keyboardIsShown={keyboardIsShown}
                        placeholder="Phone"
                        placeholderTextColor={THEMES.placeholderTextColor}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                        width={SIZES.width * 0.88}
                        height={51}
                        country={country}
                        setCountry={setCountry}
                        theme={theme}
                        error={errors.phone}
                      />
                    </View>
                  </View>
                  <Animated.View
                    style={{
                      width: "100%",
                      marginBottom: 20,
                      marginTop: mTop,
                    }}
                  >
                    <CustomButton
                      disabled={!isValid || !values.phone}
                      gradient="thunder"
                      color={COLORS.white}
                      onPress={() => handleSubmit(values)}
                      backgroundColor={buttonBackgroundColor(isValid, values)}
                      color={buttonColor(isValid, values)}
                      arrowRight
                    />
                  </Animated.View>
                  {showModal && (
                    <SuccessModal
                      showModal={showModal}
                      toggleShowModal={handlePressModalButton}
                      theme={theme}
                      text={`The link to create a new password has 
          been sent to ${country.dial_code + " " + values.phone}`}
                      buttonText="Back"
                      buttonArrow="left"
                      buttonEvent={handlePressModalButton}
                    />
                  )}
                  {showSuccessModal && (
                    <SuccessModal
                      showModal={showSuccessModal}
                      toggleShowModal={toggleShowSuccessModal}
                      theme={theme}
                      text="Password has been changed"
                      buttonText="Back to log in"
                      buttonArrow="left"
                      buttonEvent={() => {
                        navigation.navigate("LogIn");
                      }}
                    />
                  )}
                </>
              );
            }}
          </Formik>
        </View>
      </KeyboardAvoidingView>
      <Panel
        {...panelProps}
        isActive={isPanelActive}
        goBack={goToPreviousScreen}
      >
        <Gradient
          style={theme === "dark" ? "darkAshPurple" : "lightAsh"}
          borderTopRadius={20}
        />
        <ForgotPasswordPanel
          handleSubmit={handleSubmit}
          activeScreen={activeScreen}
          navigation={navigation}
          theme={theme}
          themes={themes}
          goBack={goToPreviousScreen}
          userId={userId}
          phone={phoneNumber}
          closePanel={closePanel}
        />
      </Panel>
    </SafeAreaView>
  );
}

export default connect(null, { setError: authOperations.setError })(
  withKeyboard(withBackground(ForgotPassword))
);
