import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SIZES, THEMES } from "../../constants";
import CreatePassword from "./CreatePassword";
import PhoneNumber from "./PhoneNumber";
import ConfirmationCode from "./ConfirmationCode";
import { post } from "../../api/post";

export default function AuthPanel({
  theme,
  themes,
  activeScreen,
  handleSubmit,
  goBack,
  userId,
  navigation,
  closePanel,
}) {
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
    await post("/resend-code", { id: userId });
  };

  useEffect(() => {
    activeScreen === 4 && startResendTimer();
  }, [activeScreen]);

  const [resendTime, setResendTime] = useState(59);

  return (
    <View style={[styles.wrap]}>
      {activeScreen === 2 && (
        <CreatePassword onSubmit={handleSubmit} theme={theme} themes={themes} />
      )}
      {activeScreen === 3 && (
        <PhoneNumber onSubmit={handleSubmit} theme={theme} themes={themes} />
      )}
      {activeScreen === 4 && (
        <ConfirmationCode
          themes={themes}
          theme={theme}
          userId={userId}
          goBack={goBack}
          startResendTimer={resendCode}
          resendTime={resendTime}
          navigation={navigation}
          closePanel={closePanel}
        />
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
