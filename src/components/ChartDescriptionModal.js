import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CloseIcon from "../assets/icons/Close";
import Gradient from "../components/Gradient/Gradient";
import { global, SIZES } from "../constants";
import background from "../assets/img/successModal-background.png";

export default function ChartDescriptionModal({
  text,
  showModal = false,
  toggleShowModal,
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
      marginTop: 25,
      marginBottom: 20,
      alignSelf: "center",
    },

    text: {
      alignSelf: "center",
      maxWidth: 329,
      color: "#FFFFFF",
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
            height: "50%",
            zIndex: 100,
            backgroundColor: "#E4E5EB",
            borderRadius: 5,
            overflow: "hidden",
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
              <CloseIcon color={"#FFFFFF"} />
            </TouchableOpacity>
          </View>
          <Gradient style="darkAshPurple" />

          <ScrollView
            style={styles.messageBlock}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.text, global.h5dark]}>{text}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
