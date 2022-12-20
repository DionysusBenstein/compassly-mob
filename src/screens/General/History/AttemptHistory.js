import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import withGeneralBackground from "../../../hoc/withGeneralBackground";
import { global, COLORS } from "../../../constants";
import { Header } from "../../../components";
import { bin } from "../../../assets/icons";
import { SvgXml } from "react-native-svg";
import SaveAttempt from "../../../components/SessionModals/SaveAttempt";
import { getTime } from "../../../utils/getTime";
import { deleteApi } from "../../../api/deleteApi";
import { useIsFocused } from "@react-navigation/core";
import { toTwelweHour } from "../../../utils/changeTimeFormat";

function AttemptHistory({ route, navigation, themes }) {
  const { client, attempts, startTime } = route.params;
  const [deletedAttempts, setDeletedAttempts] = useState(0);

  const isFocused = useIsFocused();
  useEffect(() => {
    !isFocused && navigation.goBack();
  }, [isFocused]);

  const checkData = () => {
    setDeletedAttempts((prevState) => prevState + 1);
    if (attempts.length === deletedAttempts + 1) {
      navigation.goBack();
    }
  };

  const displayTime = (time) => {
    if (time) {
      let timeArr = time.split(":");
      return toTwelweHour(timeArr[0], timeArr[1]);
    } else {
      return "";
    }
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      paddingVertical: 21,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: themes.listBorderColor,
      marginBottom: 24,
      marginTop: 25,
    },
    headerTime: {
      ...global.h5dark,
      color: themes.textColor,
      marginRight: 22,
    },
    headerName: {
      ...global.p5dark,
      color: themes.textColor,
      marginRight: 10,
    },
    headerRole: {
      ...global.p5dark,
      color: themes.textColor,
      opacity: 0.4,
    },
    info: {
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      marginBottom: 27,
      paddingHorizontal: 12,
    },
    infoName: {
      ...global.h5dark,
      color: themes.textColor,
    },
    infoText: {
      flexBasis: "65%",
      ...global.p5dark,
      color: themes.textColor,
    },
    item: {
      flexDirection: "row",
      paddingLeft: 23,
      paddingRight: 48,
      paddingVertical: 13,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: 12,
      marginBottom: 5,
      alignItems: "center",
      flexWrap: "wrap",
      // justifyContent: "space-between",
    },
    itemHeader: {
      ...global.h5dark,
      color: themes.textColor,
      marginRight: 5,
    },
    itemSubheader: {
      ...global.p5dark,
      color: themes.textColor,
      marginRight: 15,
    },
    itemText: {
      ...global.p5dark,
      color: themes.textColor,
      opacity: 0.5,
    },
    itemButton: {
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.5,
      marginLeft: "auto",
      position: "absolute",
      right: 20,
    },
  });

  return (
    <SafeAreaView style={[global.container]}>
      <Header
        role="client"
        name={client.name + " " + client.surname}
        backButtonEvent={() => navigation.goBack()}
      />
      <View style={styles.header}>
        <Text style={styles.headerTime}>{displayTime(startTime)}</Text>
        <Text style={styles.headerName}>
          {client.name + " " + client.surname}
        </Text>
        <Text style={styles.headerRole}>client</Text>
      </View>

      <ScrollView
        style={{ flex: 1, marginBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {attempts.map((el, i) => {
          console.log("el ==>", el);
          return (
            <TargetSkillHistory
              checkData={checkData}
              key={el.skill_id}
              styles={styles}
              el={el}
              themes={themes}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const TargetSkillHistory = ({ styles, el, themes, checkData }) => {
  const [data, setData] = useState(el.list);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    data.length === 0 && checkData();
  }, [data]);

  const openModal = (id) => {
    setModalIsOpen(true);
    setDeleteId(id);
  };

  const deleteAttempt = async () => {
    setData((prevState) => {
      return prevState.filter((el, i) => el.id !== deleteId);
    });
    const res = await deleteApi(`/history/${deleteId}`);
    setModalIsOpen(false);
  };

  return data.length ? (
    <View style={{ marginBottom: 25 }}>
      <View style={styles.info}>
        <Text style={styles.infoName}>Domain</Text>
        <Text style={styles.infoText}>{el.domain}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoName}>Subdomain</Text>
        <Text style={styles.infoText}>{el.sub_domain}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoName}>Target skill</Text>
        <Text style={styles.infoText}>{el.skill}</Text>
      </View>
      <View>
        {data.map((item, i) => {
          return (
            <View style={styles.item} key={item.id}>
              <View style={{ flexDirection: "row", width: 130 }}>
                <Text style={styles.itemHeader}>Duration: </Text>
                <Text style={styles.itemSubheader}>
                  {getTime(item.total_time, "locale")}
                </Text>
              </View>
              <Text style={styles.itemText}>
                (
                {toTwelweHour(item.start.hour, item.start.minute) +
                  " - " +
                  toTwelweHour(item.end.hour, item.end.minute)}
                )
              </Text>
              <TouchableOpacity
                hitSlop={global.hitslop}
                style={styles.itemButton}
                onPress={() => {
                  openModal(item.id);
                }}
              >
                <SvgXml xml={bin} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      {modalIsOpen && (
        <SaveAttempt
          showModal={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          text="Are you sure you want to delete attempt?"
          themes={themes}
          cancelColor={COLORS.red}
          confirmGradient="thunder"
          confirmText="Yes"
          cancelText="Cancel"
          onSubmit={() => {
            deleteAttempt();
          }}
          onCancel={() => setModalIsOpen(false)}
        />
      )}
    </View>
  ) : null;
};

export default withGeneralBackground(AttemptHistory);
