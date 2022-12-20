0;
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { THEMES, global, COLORS } from "../../constants";
import { post } from "../../api/post";
import { CustomButton, Gradient, SuccessModal } from "../../components";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import { SvgXml } from "react-native-svg";
import { Mobile } from "../../assets/icons";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { connect } from "react-redux";
import authOperations from "../../redux/auth/authOperations";
import authSelectors from "../../redux/auth/authSelectors";
const CELL_COUNT = 4;

function ConfirmationCode({
  userId,
  goBack,
  theme,
  setError,
  error,
  resendTime,
  startResendTimer,
  themes,
  closePanel,
  handleSubmit,
  clearError,
}) {
  const styles = StyleSheet.create({
    wrap: {
      paddingBottom: 40,
    },
    codeFieldRoot: {
      marginTop: 42,
      width: 305,
      alignSelf: "center",
    },
    cell: {
      width: 50,
      height: 52,
      backgroundColor:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(53, 59, 79, 0.15)",
      color: "#41B52E",
      fontSize: 24,
      display: "flex",
      textAlign: "center",
      fontWeight: "600",
      borderRadius: 5,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    cellText: {
      color: "#FFFFFF",
    },
    focusCell: {
      backgroundColor: "rgba(65, 181, 46, 0.15)",
    },
    text: {
      marginTop: 65,
      textAlign: "center",
      fontSize: 15,
      fontWeight: "400",
      color: theme === "dark" ? COLORS.mediumGray : COLORS.darkAshPurple,
    },
    title: {
      color: themes.textColor,
      textAlign: "center",
      marginBottom: 43,
      marginTop: 43,
    },
    subtitle: {
      marginTop: 37,
      color: themes.textColor,
      textAlign: "center",
    },
    resendTime: {
      color: theme === "dark" ? COLORS.pastelBlue : COLORS.happyPurple,
      marginTop: 3,
    },
    backBtn: {
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      marginTop: 69,
    },
    backBtnText: {
      fontSize: 15,
      fontWeight: "400",
      color: themes.textColor,
      marginLeft: 10,
    },
  });

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [value, setValue] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [showModal, setShowModal] = useState(false);

  const checkCode = async () => {
    console.log("code", value);
    console.log("id", userId);

    let res = await post("/code", { code: value, id: userId });
    if (!res.result.err) {
      console.log("Confirmation code ==> res", res);
      handleSubmit ? handleSubmit() : setShowModal(true);
      clearError();
      setValue("");
    } else {
      setError({
        message1: "Wrong OTP!",
        message2:
          "Try typing it once again or wait until the resend is available.",
      });
    }
  };

  useEffect(() => {
    if (value.length === 4) {
      checkCode();
    } else if (value.length === 3 && error) {
      clearError();
    }
  }, [value, clearError]);

  useEffect(() => {
    if (!error) {
      setValue("");
    }
  }, [error]);

  const toggleShowModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  return (
    <View style={styles.wrap}>
      <SvgXml xml={Mobile} style={{ alignSelf: "center" }} />
      <Text style={[global.p4dark, styles.title]}>OTP</Text>
      <Text style={[global.p5dark, styles.subtitle]}>
        Type in the OTP sent to your mobile phone number.
      </Text>

      {showModal && (
        <SuccessModal
          showModal={true}
          toggleShowModal={toggleShowModal}
          theme={theme}
          text="Thanks for joining Compassly"
          buttonArrow="right"
          buttonText="Proceed"
          buttonEvent={() => {
            closePanel();
            setShowModal(false);
          }}
        />
      )}

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, symbol && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol ? (
              <Gradient style={symbol && !error ? "darkGreen" : "red2"} />
            ) : null}
            <Text style={[styles.cellText, global.h3White]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      {resendTime === 60 ? (
        <View style={{ marginTop: 65 }}>
          <CustomButton
            text="Resend OTP"
            onPress={startResendTimer}
            gradient={theme === "dark" ? "darkAshPurple" : "thunder"}
            color={theme === "light" ? "#FFFFFF" : COLORS.mediumGray}
          />
        </View>
      ) : (
        <>
          <Text style={styles.text}>Didn’t get the code?</Text>
          <Text style={[styles.text, { marginTop: 8 }]}>
            Resend in{" "}
            <Text style={styles.resendTime}>
              {" "}
              00:{resendTime > 0 && resendTime < 10 && 0}
              {resendTime}
            </Text>
          </Text>
        </>
      )}

      <TouchableOpacity style={styles.backBtn} onPress={goBack}>
        <ArrowLeft color={themes.textColor} />
        <Text style={styles.backBtnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default connect(
  (state) => {
    return { error: authSelectors.getError(state) };
  },
  { setError: authOperations.setError, clearError: authOperations.clearError }
)(ConfirmationCode);
