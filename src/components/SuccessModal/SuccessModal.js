import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from "react-native";
import CloseIcon from "../../assets/icons/Close";
import CustomButton from "../../components/Button/CustomButton";
import Gradient from "../../components/Gradient/Gradient";
import { COLORS, global, SIZES, THEMES } from "../../constants";
import background from "../../assets/img/successModal-background.png";
import { SvgXml } from "react-native-svg";
import { SuccessIcon } from "../../assets/icons";

export default function SuccessModal({
  text,
  showModal = false,
  toggleShowModal,
  theme,
  buttonText,
  buttonArrow,
  buttonEvent,
}) {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0, 0.5)",
      width: SIZES.width,
      height: SIZES.height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 15,
    },
    messageBlock: {
      paddingBottom: 38,
      width: "100%",
      paddingHorizontal: 23,
      marginTop: 38,
      alignItems: "center",
      alignSelf: "center",
    },

    text: {
      textAlign: "center",
      marginTop: 26,
      alignSelf: "center",
      maxWidth: 329,
      color: theme === "light" ? COLORS.darkAshPurple : "#FFFFFF",
    },
  });

  {
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      coverScreen={false}
      isVisible={showModal}
      onBackdropPress={() => {}}
      onBackButtonPress={() => {}}
      backdropColor={"#fff"}
      backdropOpacity={0.95}
    >
      <View style={[styles.container]}>
        <View
          style={{
            position: "relative",
            width: SIZES.containerWidth,
            // height: 250,
            zIndex: 100,
            backgroundColor: "#E4E5EB",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={background}
            resizeMode="contain"
            style={{
              width: "100%",
              top: 0,
              height: 130,
              zIndex: 10,
              position: "absolute",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                zIndex: 200,
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingTop: 20,
                paddingRight: 18,
              }}
            >
              <TouchableOpacity
                onPress={toggleShowModal}
                hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
              >
                <CloseIcon
                  color={theme === "light" ? COLORS.darkAshPurple : "#FFFFFF"}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {theme === "dark" && <Gradient style="darkAshPurple" />}

          <View style={styles.messageBlock}>
            <SvgXml xml={SuccessIcon} />
            <Text style={[styles.text, global.h5dark]}>{text}</Text>
            {buttonEvent ? (
              <View style={{ width: "100%", marginTop: 33 }}>
                <CustomButton
                  gradient="thunder"
                  color="#FFFFFF"
                  text={buttonText}
                  arrowRight={buttonArrow === "right"}
                  arrowLeft={buttonArrow === "left"}
                  onPress={buttonEvent}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}
