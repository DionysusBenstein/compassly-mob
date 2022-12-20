import React, { useRef } from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { Gradient } from ".";
import { camera, gallery } from "../assets/icons";
import { SIZES, global } from "../constants";

export default function OpenCameraModal({
  showModal,
  themes,
  closeModal,
  openCamera,
  openGallery,
}) {
  const styles = StyleSheet.create({
    text: {
      ...global.p5dark,
      color: themes.textColor,
      marginTop: 5,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      //   backgroundColor: "rgba(0,0,0, 0.5)",
      width: SIZES.width,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    wrap: {
      width: SIZES.width,
      borderRadius: 5,
      overflow: "hidden",
      alignItems: "center",
      height: 250,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    button: {
      marginBottom: 14,
      alignItems: "center",
    },
    header: {
      marginTop: 25,
      marginBottom: 30,
      ...global.h5White,
      color: themes.textColor,
    },
  });

  const overlayRef = useRef();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      coverScreen={true}
      isVisible={showModal}
      onBackdropPress={() => {
        console.log("slide");
      }}
      onBackButtonPress={() => {}}
      backdropColor={"#fff"}
      backdropOpacity={0.95}
    >
      <TouchableOpacity
        ref={overlayRef}
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={(e) =>
          e.target._nativeTag === overlayRef.current._nativeTag && closeModal()
        }
      >
        <View style={styles.wrap}>
          <Gradient style="darkAshPurple" />
          <Text style={styles.header}>Choose image from</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button, { marginRight: 60 }]}
              onPress={openCamera}
            >
              <SvgXml xml={camera} />
              <Text style={styles.text}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openGallery}>
              <SvgXml xml={gallery} />
              <Text style={styles.text}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
