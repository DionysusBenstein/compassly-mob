import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { connect } from 'react-redux';

// import RNPickerSelect from "react-native-picker-select";
// import { ArrowDown } from "../../../assets/icons";
// import ModalSelector from "react-native-modal-selector";
import { get } from '../../../api/get';
import { listIcon } from '../../../assets/icons';
import { ArrowRight } from '../../../assets/icons';
import { schedule, planner } from '../../../assets/icons/Planner';
import { Header } from '../../../components';
import { global, FONTS, SIZES, COLORS } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';
import dcmOperations from '../../../redux/dcm/dcmOperations';
import dcmSelectors from '../../../redux/dcm/dcmSelectors';

function Planner({ navigation, themes, theme, activeUser, setActiveUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [focusedUser, setFocusedUser] = useState(null);

  const menuButtons = [
    {
      title: 'Daily schedule',
      icon: schedule,
      onPress: () => {
        navigation.navigate('DailySchedule');
      },
    },
    {
      title: 'Daily planner',
      icon: planner,
      onPress: () => {
        navigation.navigate('DailyPlanner');
      },
    },
    {
      title: 'Materials',
      icon: listIcon,
      onPress: () => navigation.navigate('Downloads'),
    },
  ];

  const getClients = async () => {
    let res = await get('/clients');
    if (!res.error) {
      setUsers(res.result.data);
      console.log(res.result.data);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (activeUser && activeUser.client_id) {
      setSelectedUser(activeUser);
    }
  }, [activeUser]);

  const inputRef = useRef();

  const selectUser = (user) => {
    setSelectedUser(user);
    setActiveUser(user);
  };

  const styles = StyleSheet.create({
    list: {
      opacity: !selectedUser ? 0.6 : 1,
      marginTop: 35,
    },
    listItem: {
      flexDirection: 'row',
      width: '100%',
      height: 64,
      paddingLeft: 19,
      paddingRight: 31,
      marginBottom: 10,
      borderRadius: 12,
      backgroundColor: themes.subdomainBackgroundColor,
      alignItems: 'center',
    },
    listItemText: {
      marginLeft: 29,
      ...global.p5dark,
      color: themes.textColor,
    },
    arrow: {
      marginLeft: 'auto',
    },
  });

  const iosPickerStyle = {
    chevronDown: {
      display: 'none',
    },
    chevronUp: {
      display: 'none',
    },
    done: {
      fontFamily: FONTS.sfRegular,
      color: themes.textColor,
      fontSize: SIZES.t4,
    },
    doneDepressed: {
      fontSize: SIZES.t4,
    },
    viewContainer: {
      opacity: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
      position: 'absolute',
    },

    modalViewMiddle: {
      borderTopWidth: 0,
      backgroundColor: theme === 'dark' ? COLORS.darkAshPurple : 'rgba(255,255,255, 0.7)',
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
    },
    modalViewBottom: {
      backgroundColor: theme === 'dark' ? COLORS.darkAshPurple : COLORS.white,
    },
  };

  return (
    <SafeAreaView style={[global.container]}>
      <Header
        backButtonEvent={() => navigation.goBack()}
        name={selectedUser ? selectedUser.name + ' ' + selectedUser.surname : 'Select Client'}
        role="client"
      />
      {/* {Platform.OS === "ios" && (
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[global.p5dark, { color: themes.textColor, marginRight: 8 }]}
          >
            {selectedUser
              ? selectedUser.name + " " + selectedUser.surname
              : "Select client"}
          </Text>
          <SvgXml xml={ArrowDown} stroke={themes.textColor} />
          <RNPickerSelect
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            ref={inputRef}
            pickerProps={{
              style: {
                color: "red",
              },
            }}
            style={iosPickerStyle}
            onValueChange={(value) => {
              setFocusedUser(users[value]);
            }}
            onDonePress={(e) => selectUser(focusedUser)}
            items={users.map((user, i) => {
              return {
                label: user.name + " " + user.surname,
                value: i,
                color: themes.textColor,
              };
            })}
          />
        </View>
      )}
      {Platform.OS === "android" && (
        <ModalSelector
          optionTextStyle={{
            color: themes.textColor,
            fontFamily: FONTS.sfRegular,
          }}
          optionContainerStyle={{
            backgroundColor:
              theme === "dark" ? COLORS.darkAshPurple : "#FFFFFF",
            borderRadius: 12,
          }}
          optionStyle={{
            borderBottomColor: themes.listBorderColor,
          }}
          overlayStyle={{
            backgroundColor: themes.domainBackgroundColor,
          }}
          cancelStyle={{
            borderRadius: 12,
            backgroundColor:
              theme === "dark" ? COLORS.darkAshPurple : COLORS.white,
          }}
          cancelText="Close"
          cancelTextStyle={{
            color: COLORS.red,
            fontFamily: FONTS.sfRegular,
          }}
          data={users.map((user, i) => {
            return { label: user.name + " " + user.surname, key: i };
          })}
          initValue="Select user"
          onChange={(option) => {
            selectUser(users[option.key]);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 25,
              marginBottom: 0,
            }}
          >
            <Text
              style={[
                global.p5dark,
                { color: themes.textColor, marginRight: 8 },
              ]}
            >
              {selectedUser
                ? selectedUser.name + " " + selectedUser.surname
                : "Select client"}
            </Text>
            <View style={{ paddingTop: 5 }}>
              <SvgXml xml={ArrowDown} stroke={themes.textColor} />
            </View>
          </View>
        </ModalSelector>
      )} */}
      <View style={styles.list}>
        {menuButtons.map((el) => {
          return (
            <TouchableOpacity key={el.title} disabled={!selectedUser} style={styles.listItem} onPress={el.onPress}>
              <SvgXml xml={el.icon} fill={themes.textColor} />
              <Text style={styles.listItemText}>{el.title}</Text>
              <View style={styles.arrow}>
                <ArrowRight color={themes.textColor} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    activeUser: dcmSelectors.getActiveUser(state),
  };
};

export default connect(mapStateToProps, {
  setActiveUser: dcmOperations.setActiveUser,
})(withGeneralBackground(Planner));
