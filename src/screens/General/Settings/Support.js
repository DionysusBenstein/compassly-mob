import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import withGeneralBackground from "../../../hoc/withGeneralBackground";
import supportBg from "../../../assets/img/General/supportBg.png";
import { SIZES } from "../../../constants";
import { ArrowRight } from "../../../assets/icons";
import { Header } from "../../../components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const menuButtons = [
  // {
  //   name: "Knowledge base (Coming soon)",
  //   route: "KnowledgeBase",
  // },
  {
    name: "Terms of service",
    route: "TermsOfService",
  },
  {
    name: "Contact us",
    route: "ContactUs",
  },
  // {
  //   name: "Privacy policy (Coming soon)",
  //   route: "PrivacyPolicy",
  // },
];

function Support({ navigation, themes }) {
  const scrollViewBottom = useBottomTabBarHeight();

  const styles = StyleSheet.create({
    list: {
      marginTop: 27,
    },
    listItem: {
      flexDirection: "row",
      width: "100%",
      height: 64,
      paddingLeft: 19,
      paddingRight: 31,
      marginBottom: 10,
      borderRadius: 12,
      backgroundColor: themes.subdomainBackgroundColor,
      alignItems: "center",
    },
    listItemText: {
      marginLeft: 29,
      ...global.p5dark,
      color: themes.textColor,
    },
    arrow: {
      marginLeft: "auto",
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: SIZES.width,
          height: 225,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          overflow: "hidden",
          top: 0,
        }}
      >
        <Image
          source={supportBg}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <View style={{ top: 30, position: "absolute", alignSelf: "center" }}>
          <Header
            header="Support"
            backButtonEvent={() => navigation.goBack()}
            role="client"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: SIZES.width * 0.88,
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: 61,
          // marginTop: -50,
          marginBottom: scrollViewBottom + 40,
        }}
      >
        {menuButtons.map((el) => {
          return (
            <TouchableOpacity
              disabled={el.route ? false : true}
              key={el.name}
              style={[styles.listItem, { opacity: !el.route ? 0.7 : 1 }]}
              onPress={() => {
                el.route && navigation.navigate(el.route);
              }}
            >
              <Text style={styles.listItemText}>{el.name}</Text>
              <View style={styles.arrow}>
                <ArrowRight color={themes.textColor} />
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 60 }}></View>
      </ScrollView>
    </View>
  );
}

export default withGeneralBackground(Support);
