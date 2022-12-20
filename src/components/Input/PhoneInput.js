import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Platform,
  Keyboard,
} from "react-native";
import Gradient from "../Gradient/Gradient";
import { COLORS, global } from "../../constants";
import { countryCodes } from "../../constants";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { TextInputMask } from "react-native-masked-text";
import { LogBox } from "react-native";
import { SvgXml } from "react-native-svg";

export default function PhoneInput({
  width,
  height,
  error,
  borderWidth = 1,
  onChangeText,
  value,
  country,
  setCountry,
  theme,
  transparent = true,
  keyboardIsShown,
}) {
  const listRef = useRef();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    if (keyboardIsShown) {
      setIsOpenPicker(false);
    }
  }, [keyboardIsShown]);

  const styles = StyleSheet.create({
    wrap: {
      position: "relative",
    },
    input: {
      position: "absolute",
    },
    transparentInput: {
      borderColor: "#C0BCE896",
      borderWidth: 1,
      backgroundColor: "transparent",
    },
    flagBlock: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
    },

    countryPicker: {
      width: 73,
      position: "absolute",
      backgroundColor: theme === "dark" ? "#353B4F" : "#F0F2F8",
      left: 8,
      top: Platform.OS === "ios" ? 6 : 5.5,
      height: 140,
      zIndex: 150,
      borderRadius: 12,
      overflow: "visible",
    },
  });

  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const color = () => {
    if (error) {
      return COLORS.red;
    } else {
      return theme === "dark" ? "#FFFFFF" : COLORS.darkAshPurple;
    }
  };

  const countryPicker = () => {
    return (
      <View
        activeOpacity={1}
        onPress={() => {
          setIsOpenPicker(!isOpenPicker);
        }}
        style={styles.countryPicker}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingLeft: 14 }}
        >
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              hitSlop={global.hitslop}
              activeOpacity={0.8}
              onPress={() => {
                setIsOpenPicker(!isOpenPicker);
              }}
              style={[styles.flagBlock, { marginTop: 10, marginBottom: 15 }]}
            >
              <Text style={{ marginRight: 8 }}>{country.flag}</Text>
              <View style={{ marginTop: 3, transform: [{ rotate: "180deg" }] }}>
                <SvgXml xml={ArrowDown} stroke={color()} />
              </View>
            </TouchableOpacity>

            <FlatList
              data={countryCodes}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    hitSlop={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    key={item.code}
                    style={[styles.flagBlock, { marginBottom: 13 }]}
                    onPress={() => {
                      setIsOpenPicker(!isOpenPicker);
                      setCountry(item);
                    }}
                  >
                    <Text style={{ marginRight: 8 }}>{item.flag}</Text>

                    <Text
                      style={{
                        marginTop: 3,
                        fontSize: 12,
                        fontWeight: "400",
                        color: color(),
                      }}
                    >
                      {item.code}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.code}
              extraData={country.code}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      <View
        style={[
          styles.wrap,
          {
            width,
            height,
            // overflow: "hidden",
            borderRadius: 12,
          },
        ]}
      >
        {isOpenPicker && countryPicker()}

        {!transparent && (
          <Gradient
            style={theme === "dark" ? "transparentWhite" : "transparentBlack"}
          />
        )}

        <View
          style={[
            global.textInput,
            styles.input,
            {
              backgroundColor: theme === "dark" ? "#2F3547" : "#F0F2F8",
              paddingHorizontal: 20,
              width: width - borderWidth * 2,
              height: height - borderWidth * 2,
              left: borderWidth,
              top: borderWidth,
              flexDirection: "row",
              paddingVertical: 0,
            },
            transparent && styles.transparentInput,
            error && global.textInputError,
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              keyboardIsShown && Keyboard.dismiss();
              setIsOpenPicker(!isOpenPicker);
            }}
            style={[styles.flagBlock, { height: "100%" }]}
          >
            <Text style={{ marginRight: 8 }}>{country.flag}</Text>
            <Image
              source={{
                uri: `https://www.countryflags.io/${country.code}/flat/64.png`,
              }}
            />
            <View style={{ marginTop: 1 }}>
              <SvgXml xml={ArrowDown} stroke={color()} />
            </View>
          </TouchableOpacity>

          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginLeft: isOpenPicker ? 20 : 13,
                fontSize: 15,
                fontWeight: "400",
                color: color(),
              }}
            >
              {country.dial_code}
            </Text>
          </View>
          <View ref={listRef}></View>
          <TextInputMask
            placeholder="XXX XXX XXXX"
            placeholderTextColor={
              theme === "dark"
                ? "rgba(255,255,255, 0.6)"
                : "rgba(53, 59, 79, 0.6)"
            }
            style={{
              marginLeft: 9,
              fontSize: 15,
              color: color(),
              minWidth: 170,
            }}
            type={"cel-phone"}
            maxLength={12}
            value={value}
            onChangeText={(text) => {
              const phoneNum = text.toString().replace(/\D+/g, "");

              onChangeText(phoneNum);
            }}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "999 999 9999",
            }}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </>
  );
}
