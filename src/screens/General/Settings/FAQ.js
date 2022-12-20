import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Header } from "../../../components";
import withGeneralBackground from "../../../hoc/withGeneralBackground";
import Collapsible from "react-native-collapsible";
import { global } from "../../../constants";
import { SvgXml } from "react-native-svg";
import { ArrowRight, gradientBorder2 } from "../../../assets/icons";

const menuButtons = [
  {
    id: 1,
    header: "How do I do it?",
    text: "Lorem ipsum lorem ipsum lorem ipusm lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem. ",
  },
  {
    id: 2,
    header: "How do I do it?",
    text: "Lorem ipsum lorem ipsum lorem ipusm lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem. ",
  },
  {
    id: 3,
    header: "How do I do it?",
    text: "Lorem ipsum lorem ipsum lorem ipusm lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem. ",
  },
  {
    id: 4,
    header: "How do I do it?",
    text: "Lorem ipsum lorem ipsum lorem ipusm lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem. ",
  },
  {
    id: 5,
    header: "How do I do it?",
    text: "Lorem ipsum lorem ipsum lorem ipusm lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem. ",
  },
];

function FAQ({ navigation, themes }) {
  return (
    <SafeAreaView style={global.container}>
      <Header
        backButtonEvent={() => {
          navigation.goBack();
        }}
        header="FAQ"
        role="client"
      />

      <ScrollView
        style={{ marginBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {menuButtons.map((el) => {
            return (
              <CollapsibleButton
                key={el.id}
                header={el.header}
                text={el.text}
                themes={themes}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CollapsibleButton = ({ header, text, themes }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const styles = StyleSheet.create({
    menuWrap: {
      paddingLeft: 23,
      paddingRight: 18,
      paddingVertical: 23,
      borderBottomColor: themes.listBorderColor,
      borderBottomWidth: 1,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",

      justifyContent: "space-between",
    },
    menuHeader: {
      ...global.p5dark,
      fontWeight: isCollapsed ? "400" : "500",
      color: themes.textColor,
    },
    menuText: {
      ...global.p5dark,
      color: themes.textColor,
      marginTop: 24,
    },
    openButton: {
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    openButtonArrow: {
      transform: [{ rotate: isCollapsed ? "0" : "-90deg" }],
      position: "absolute",
    },
  });

  const handleOpen = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  };

  return (
    <View style={styles.menuWrap}>
      <View style={styles.menuItem}>
        <Text style={styles.menuHeader}>{header}</Text>
        <TouchableOpacity onPress={handleOpen}>
          <View style={styles.openButton}>
            <View style={styles.openButtonArrow}>
              <ArrowRight color={themes.textColor} />
            </View>
            <SvgXml xml={gradientBorder2} />
          </View>
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <Text style={styles.menuText}>{text}</Text>
      </Collapsible>
    </View>
  );
};

export default withGeneralBackground(FAQ);
