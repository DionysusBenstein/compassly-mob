import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SIZES, THEMES } from "../../constants";
import CreatePassword from "./CreatePassword";
import ConfirmationCode from "./ConfirmationCode";

export default function ForgotPasswordPanel({
  theme,
  themes,
  handleSubmit,
  activeScreen,
  navigation,
  goBack,
  userId,
  closePanel,
}) {
  const [resendTime, setResendTime] = useState(59);

  const startResendTimer = () => {
    let count = 60;
    let interval = setInterval(function () {
      count--;
      setResendTime(count);
      if (count === 0) {
        setResendTime(60);
        clearInterval(interval);
      }
    }, 1000);
  };

  const resendCode = async () => {
    startResendTimer();
    const formdata = new FormData();
    formdata.append("id", userId);
    await post("/resend-code", formdata);
  };

  useEffect(() => {
    activeScreen === 2 && startResendTimer();
  }, [activeScreen]);

  return (
    <View style={[styles.wrap]}>
      {activeScreen === 2 && (
        <ConfirmationCode
          themes={themes}
          theme={theme}
          userId={userId}
          goBack={goBack}
          startResendTimer={resendCode}
          resendTime={resendTime}
          navigation={navigation}
          closePanel={closePanel}
          handleSubmit={handleSubmit}
        />
      )}
      {activeScreen === 3 && (
        <CreatePassword onSubmit={handleSubmit} theme={theme} themes={themes} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: SIZES.height * 0.86,
    paddingTop: 51,
    width: SIZES.width * 0.88,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  gradient: {
    width: 92,
    height: 92,
    borderRadius: 46,
    // overflow: "hidden",
  },
  header: {
    color: THEMES.themeTextColor,
    textAlign: "center",
    marginTop: 36,
    marginBottom: 44,
  },
  text: {
    color: THEMES.themeTextColor,
    textAlign: "center",
    maxWidth: 329,
    alignSelf: "center",
  },
});
