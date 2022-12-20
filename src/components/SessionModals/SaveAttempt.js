import React from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import { SIZES } from "../../constants";
import Gradient from "../Gradient/Gradient";
import CloseIcon from "../../assets/icons/Close";
import CustomButton from "../Button/CustomButton";
import { global } from "../../constants";

export default function ModalWrap({
  showModal,
  themes,
  closeModal,
  onSubmit,
  text,
  confirmText,
  cancelText,
  cancelColor,
  confirmGradient,
  onCancel,
  intervals,
}) {
  const styles = StyleSheet.create({
    text: {
      textAlign: "center",
      marginBottom: 32,
      lineHeight: 25,
      maxWidth: "80%",
      alignSelf: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0, 0.5)",
      width: SIZES.width,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    wrap: {
      width: SIZES.width * 0.87,
      borderRadius: 5,
      overflow: "hidden",
      alignItems: "center",
    },
    block: {
      paddingTop: 34,
      width: SIZES.width * 0.75,
      paddingBottom: 20,
    },
    close: {
      position: "absolute",
      right: 15,
      top: 15,
      zIndex: 100,
    },
    buttonsBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    confirmButton: {
      flexBasis: "45%",
    },
    cancelButton: {
      // marginLeft: 20,
      borderWidth: 1,
      borderColor: themes.listBorderColor,
      backgroundColor: themes.domainBackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      flexBasis: "45%",
    },
    intervalsButton: {
      borderWidth: 1,
      borderColor: themes.listBorderColor,
      backgroundColor: themes.domainBackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      flexBasis: "30%",
      height: 51,
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      coverScreen={true}
      isVisible={showModal}
      onBackdropPress={() => {
        console.log("asd");
      }}
      onBackButtonPress={() => {}}
      backdropColor={"#fff"}
      backdropOpacity={0.95}
    >
      <View style={styles.overlay} activeOpacity={1}>
        <View style={styles.wrap}>
          <Gradient style={themes.modalGradient} />
          <TouchableOpacity
            style={styles.close}
            onPress={closeModal}
            hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
          >
            <CloseIcon color={themes.textColor} />
          </TouchableOpacity>
          <View style={styles.block}>
            <Text
              style={[styles.text, global.p5dark, { color: themes.textColor }]}
            >
              {text}
            </Text>

            {intervals ? (
              <View style={styles.buttonsBlock}>
                <TouchableOpacity
                  style={styles.intervalsButton}
                  onPress={onCancel}
                >
                  <Text style={{ color: themes.textColor }}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.intervalsButton}
                  onPress={onSubmit}
                >
                  <Text style={{ color: themes.textColor }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.intervalsButton}
                  onPress={closeModal}
                >
                  <Text style={{ color: themes.textColor }}>Skip</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonsBlock}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                >
                  <Text style={{ color: cancelColor }}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.confirmButton}>
                  <CustomButton
                    onPress={onSubmit}
                    text={confirmText}
                    color="#FFFFFF"
                    gradient={confirmGradient}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
