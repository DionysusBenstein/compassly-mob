import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { ProfileOctagon } from "../../assets/icons/Settings/profileOctagon";
import { octagonBg, octagon, editPhoto } from "../../assets/icons";
import { global } from "../../constants";
import getInitials from "../../utils/getInitials";
import { useSelector } from "react-redux";
import api_url from "../../api/api_url";

export default function ProfileInfo({ themes, style, buttonEvent }) {
  const styles = StyleSheet.create({
    profileWrap: {
      width: 123,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      height: 139,
      marginBottom: 14,
    },
    profileOctagon: {
      position: "absolute",
    },
    profileText: {
      ...global.p5White,
      position: "absolute",
      textAlign: "center",
    },
    wrap: {
      alignItems: "center",
    },
    header: {
      ...global.h5dark,
      color: themes.textColor,
      marginBottom: 5,
    },
    subheader: {
      ...global.p5dark,
      color: "rgba(255,255,255, 0.5)",
    },
    editButton: {
      position: "absolute",
      right: 10,
      bottom: 18,
    },
  });

  const currentUser = useSelector((state) => state.auth.currentUser);
  const name = currentUser.name + " " + currentUser.surname;

  const avatar = currentUser.avatar
    ? `${api_url}/users/${currentUser.avatar}`
    : null;

  return (
    <View style={style}>
      <View style={styles.profileWrap}>
        <SvgXml xml={octagon} style={{ position: "absolute" }} />
        {avatar ? (
          <ProfileOctagon image={avatar} />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgXml xml={octagonBg} />
            <Text style={styles.profileText}>{getInitials(name)}</Text>
          </View>
        )}
        {buttonEvent && (
          <TouchableOpacity
            hitSlop={global.hitslop}
            style={styles.editButton}
            onPress={() => {
              buttonEvent && buttonEvent();
            }}
          >
            <SvgXml xml={editPhoto} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.wrap}>
        <Text style={styles.header}>{name}</Text>
        <Text style={styles.subheader}>Clinician</Text>
      </View>
    </View>
  );
}
