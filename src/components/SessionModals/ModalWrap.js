import React from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SIZES } from "../../constants";
import Gradient from "../Gradient/Gradient";
import CloseIcon from "../../assets/icons/Close";
import { getTime } from "../../utils/getTime";

import {
  LatencyModal,
  RateModal,
  FrequencyModal,
  IntervalsModal,
} from "./index";
import CustomButton from "../Button/CustomButton";

export default function ModalWrap({
  showModal,
  themes,
  closeModal,
  loading,
  dcm,
  actionType,
  add,
  sub,
  behavior,
  running,
  confirmButton,
  intervals,
  rate,
}) {
  return (
    <Modal animationType="fade" isVisible={showModal} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.wrap}>
          <Gradient style={themes.modalGradient} />
          <TouchableOpacity
            style={styles.close}
            onPress={closeModal}
            hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
          >
            <CloseIcon color={themes.textColor} />
          </TouchableOpacity>
          {loading && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color={themes.textColor} />
            </View>
          )}
          <View style={[styles.block, { opacity: loading ? 0 : 1 }]}>
            {parseInt(actionType) < 3 && (
              <LatencyModal
                themes={themes}
                attempts={dcm && dcm.dcm_count}
                total_time={dcm && getTime(dcm.all_time, "locale")}
                average_time={
                  (dcm && getTime(Math.ceil(dcm.center_time, 2), "locale")) || 0
                }
              />
            )}

            {dcm && actionType === "3" && (
              <FrequencyModal
                themes={themes}
                behavior={behavior}
                add={add}
                sub={sub}
                attempts={dcm.dcm_count}
                time={getTime(dcm.all_time, "locale")}
                running={running}
                rate={rate}
              />
            )}
            {console.log("bneg =======>", rate)}
            {dcm && actionType === "4" && (
              <RateModal
                themes={themes}
                behavior={behavior}
                add={add}
                sub={sub}
                attempts={dcm.dcm_count}
                time={getTime(dcm.all_time, "locale")}
                running={running}
                rate={rate}
              />
            )}

            {dcm && actionType === "5" && (
              <IntervalsModal
                intervals={intervals}
                themes={themes}
                attempts={dcm && dcm.dcm_count}
                total_time={dcm && getTime(dcm.all_time, "locale")}
              />
            )}

            <View style={styles.button}>
              <CustomButton
                gradient="thunder"
                text={"Close"}
                color="#FFFFFF"
                onPress={confirmButton}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0, 0.5)",
    width: SIZES.width,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    width: SIZES.width * 0.87,
    // height: 200,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
  },
  block: {
    width: SIZES.width * 0.75,
    // height: "100%",
    paddingTop: 34,
  },
  close: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 100,
  },
  button: {
    marginTop: 16,
    marginBottom: 27,
  },
});
