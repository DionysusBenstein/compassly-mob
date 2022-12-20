import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import CloseIcon from "../../assets/icons/Close";
import { connect } from "react-redux";

import authOperations from "../../redux/auth/authOperations";
import { SIZES, global } from "../../constants";
import { NativeModules } from "react-native";

const { StatusBarManager } = NativeModules;

function ErrorModal({ error, clearError }) {
  const [anim, setAnim] = useState(new Animated.Value(-300));
  const [showBlock, setShowBlock] = useState(false);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      overflow: "hidden",
      alignSelf: "center",
      width: SIZES.width * 0.8,
      height: 96,
      borderRadius: 5,
      backgroundColor: error?.color ? error.color : "rgba(158, 37, 10, 0.7)",
      top: -200,
      zIndex: 1000,
      flexDirection: "row",
    },
    messageBlock: {
      width: "88%",
      justifyContent: "center",
      paddingLeft: 23,
      paddingTop: 5,
    },
    closeBlock: {
      width: "12%",
      paddingTop: 20,
      paddingLeft: 5,
    },
    errorText: {
      color: "#FFFFFF",
      fontWeight: "400",
      lineHeight: 17,
    },
  });

  useEffect(() => {
    if (error !== null && error.message1) {
      setShowBlock(true);
      Animated.timing(anim, {
        toValue: StatusBarManager.HEIGHT,
        duration: 150,
        useNativeDriver: false,
      }).start(() => {});
    } else {
      Animated.timing(anim, {
        toValue: -300,
        duration: 150,
        useNativeDriver: false,
      }).start(() => {
        setShowBlock(false);
      });
    }
  }, [error]);

  return showBlock ? (
    <Animated.View style={[styles.container, { top: anim }]}>
      <View style={styles.messageBlock}>
        {error && (
          <Text style={[styles.errorText, { marginBottom: 6 }]}>
            {error.message1}
          </Text>
        )}
        {error && error.message2 && (
          <Text style={styles.errorText}>{error.message2}</Text>
        )}
      </View>
      <View style={styles.closeBlock}>
        <TouchableOpacity
          onPress={() => clearError("")}
          hitSlop={global.hitslop}
        >
          <CloseIcon color="rgba(255,255,255, 0.4)" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  ) : null;
}

export default connect(null, { clearError: authOperations.clearError })(
  ErrorModal
);
