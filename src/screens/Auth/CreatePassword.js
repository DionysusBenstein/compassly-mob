import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  PasswordInput,
  Input,
  CustomCheckbox,
  TermsOfServiceModal,
} from "../../components";
import { global, SIZES, COLORS } from "../../constants";
import { Tick } from "../../assets/icons";
import { SvgXml } from "react-native-svg";
import { Formik } from "formik";
import resetPasswordSchema from "../../validationSchemas/resetPasswordSchema";
import { CustomButton } from "../../components";
import { PadLock } from "../../assets/icons";

export default function CreatePassword({ onSubmit, theme, themes }) {
  const [showModal, setShowModal] = useState(false);

  const styles = StyleSheet.create({
    wrap: {
      paddingBottom: 40,
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
    },
    inputGroup: {
      marginBottom: 15,
    },
    validationWrap: {
      alignSelf: "flex-start",
      marginTop: 19,
      marginBottom: 25,
    },
    validation: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "auto",
    },
    validationText: {
      color: themes.validationTextColor,
      marginLeft: 10,
    },
    text: {
      color: themes.textColor,
      textAlign: "center",
      marginBottom: 43,
      marginTop: 43,
    },
    header: {
      marginTop: 37,
      color: themes.textColor,
      textAlign: "center",
    },
    checkboxGroup: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    checkboxLabel: {
      color: COLORS.darkGray,
      marginLeft: 10,
    },
  });

  const [submited, setSubmited] = useState(false);

  const ValidationColor = (error, value) => {
    if ((error && value) || (!value && submited)) {
      return COLORS.red;
    } else if (value && !error) {
      return COLORS.darkGreen;
    } else {
      return themes.validationTextColor;
    }
  };

  const HasNumber = (myString) => {
    return /\d/.test(myString);
  };

  const buttonColor = (isValid, values) => {
    return !isValid || !values.password
      ? theme === "dark"
        ? COLORS.mediumGray
        : COLORS.darkGray
      : COLORS.white;
  };

  const buttonBackgroundColor = (isValid, values) => {
    return !isValid || !values.password
      ? theme === "dark"
        ? COLORS.darkAshPurple
        : COLORS.mediumGray
      : null;
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      // keyboardVerticalOffset={Platform.OS === "android" ? 130 : 0}
      style={{ flex: 1, width: "100%" }}
    >
      <View style={styles.wrap}>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          onSubmit={(values) => {
            onSubmit(values.password);
          }}
          validationSchema={resetPasswordSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldValue,
          }) => (
            <>
              <View style={styles.form}>
                <SvgXml xml={PadLock} style={{ alignSelf: "center" }} />

                <Text style={[global.p4dark, styles.header]}>
                  Create a password
                </Text>
                <Text style={[global.p5dark, styles.text]}>
                  Make sure your data is safe! In orer to protect it you need to
                  set a password for your profile.
                </Text>
                <View style={[global.inputGroup, styles.inputGroup]}>
                  <PasswordInput
                    error={errors.password}
                    eyeColor={
                      !errors.password ? themes.panelEyeColor : COLORS.red
                    }
                    placeholder="Password"
                    placeholderTextColor={themes.placeholderTextColor}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    width={SIZES.width * 0.86}
                    height={51}
                    theme={theme}
                  />
                </View>
                <View style={[global.inputGroup, styles.inputGroup]}>
                  <Input
                    error={errors.confirmPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor={themes.placeholderTextColor}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    width={SIZES.width * 0.86}
                    height={51}
                    theme={theme}
                  />
                </View>
                <View style={[global.inputGroup, styles.checkboxGroup]}>
                  <CustomCheckbox
                    value={values.acceptTerms}
                    onChange={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                  />
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                  >
                    <Text
                      style={[
                        styles.checkboxLabel,
                        {
                          color: values.acceptTerms
                            ? COLORS.green
                            : COLORS.darkGray,
                        },
                      ]}
                    >
                      I have read {"&"} accept{" "}
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setShowModal(true);
                        }}
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            textDecorationLine: "underline",
                          }}
                        >
                          Terms of service
                        </Text>
                      </TouchableWithoutFeedback>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.validationWrap}>
                  <View style={styles.validation}>
                    <Tick
                      color={ValidationColor(
                        errors.password === "min",
                        values.password
                      )}
                    />
                    <Text
                      style={[
                        styles.validationText,
                        {
                          color: ValidationColor(
                            errors.password === "min",
                            values.password
                          ),
                        },
                      ]}
                    >
                      8 characters long
                    </Text>
                  </View>
                  <View style={styles.validation}>
                    <Tick
                      color={ValidationColor(
                        !HasNumber(values.password),
                        values.password
                      )}
                    />
                    <Text
                      style={[
                        styles.validationText,
                        {
                          color: ValidationColor(
                            !HasNumber(values.password),
                            values.password
                          ),
                        },
                      ]}
                    >
                      At least 1 number
                    </Text>
                  </View>
                  <View style={styles.validation}>
                    <Tick
                      color={ValidationColor(
                        errors.confirmPassword,
                        values.confirmPassword
                      )}
                    />
                    <Text
                      style={[
                        styles.validationText,
                        {
                          color: ValidationColor(
                            errors.confirmPassword,
                            values.confirmPassword
                          ),
                        },
                      ]}
                    >
                      Passwords should match
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                }}
              >
                <CustomButton
                  disabled={!isValid || !values.password}
                  gradient="thunder"
                  color={COLORS.white}
                  onPress={() => {
                    handleSubmit(values.password);
                    setSubmited(true);
                  }}
                  backgroundColor={buttonBackgroundColor(isValid, values)}
                  color={buttonColor(isValid, values)}
                  arrowRight
                />
              </View>
            </>
          )}
        </Formik>
      </View>
      <TermsOfServiceModal
        showModal={showModal}
        hideModal={() => setShowModal(false)}
      />
    </KeyboardAvoidingView>
  );
}
