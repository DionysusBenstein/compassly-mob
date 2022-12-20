import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { PhoneInput } from "../../components";
import { THEMES, global, SIZES, COLORS } from "../../constants";
import { SvgXml } from "react-native-svg";
import { Formik } from "formik";
import { CustomButton } from "../../components";
import { Mobile } from "../../assets/icons";
import phoneSchema from "../../validationSchemas/phoneSchema";

export default function PhoneNumber({ onSubmit, theme, themes }) {
  const styles = StyleSheet.create({
    wrap: {
      paddingBottom: 40,
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
    },
    form: {
      // height: "100%",
      marginBottom: 0,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "red",
    },
    inputGroup: {
      marginBottom: 15,
    },
    validationWrap: {
      marginTop: "auto",
      marginBottom: "auto",
    },
    validation: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "auto",
    },
    validationText: {
      color: COLORS.darkGray,
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
  });

  const [country, setCountry] = useState({
    name: "United States",
    dial_code: "+1",
    code: "US",
    preferred: true,
    flag: "🇺🇸",
  });

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

  return (
    <View style={styles.wrap}>
      <Formik
        initialValues={{ phone: "" }}
        onSubmit={(values) => {
          if (values.phone.length === 10)
            onSubmit(country.dial_code + values.phone);
        }}
        validationSchema={phoneSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View style={styles.form}>
              <SvgXml xml={Mobile} style={{ alignSelf: "center" }} />
              <Text style={[global.p4dark, styles.header]}>Phone number</Text>
              <Text style={[global.p5dark, styles.text]}>
                Type in your phone number to establish a two-factor
                authentication.
              </Text>
            </View>
            <PhoneInput
              placeholder="Phone"
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              width={SIZES.width * 0.88}
              height={51}
              country={country}
              setCountry={setCountry}
              theme={theme}
              error={!isValid}
            />
            <View
              style={{
                marginTop: "auto",
                width: "100%",
              }}
            ></View>
            <CustomButton
              disabled={!isValid || !values.phone}
              gradient="thunder"
              color={COLORS.white}
              onPress={handleSubmit}
              backgroundColor={buttonBackgroundColor(isValid, values)}
              color={buttonColor(isValid, values)}
              arrowRight
            />
          </>
        )}
      </Formik>
    </View>
  );
}
