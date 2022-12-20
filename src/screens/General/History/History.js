import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, Text, Platform, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Appearance } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ModalSelector from 'react-native-modal-selector';
import RNPickerSelect from 'react-native-picker-select';
import { SvgXml } from 'react-native-svg';
import { connect } from 'react-redux';

import { useIsFocused } from '@react-navigation/core';

import { get } from '../../../api/get';
import { ArrowRight, date } from '../../../assets/icons';
import { Header, NoDataMessage, Attempt } from '../../../components';
import { global, FONTS, SIZES, COLORS } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';
import dcmOperations from '../../../redux/dcm/dcmOperations';
import dcmSelectors from '../../../redux/dcm/dcmSelectors';
import displayDateMonth from '../../../utils/displayDateMonth';

function History({ setActiveUser, activeUser, themes, theme, navigation }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [focusedUser, setFocusedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const inputRef = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (activeUser && activeUser.client_id) {
      setSelectedUser(activeUser);
    }
  }, [activeUser]);

  useEffect(() => {
    if (selectedUser && selectedDate && isFocused) {
      getHistory();
    }
  }, [selectedUser, selectedDate, isFocused]);

  const getClients = async () => {
    setUsersLoading(true);
    let res = await get('/clients');
    if (!res.error) {
      setUsersLoading(false);
      setUsers(res.result.data);
    }
  };

  const getHistory = async () => {
    setLoading(true);

    let res = await get(`/history/${selectedUser.client_id}/${selectedDate.getFullYear()}/${selectedDate.getMonth()}/${selectedDate.getDate()}`);
    if (res.result) {
      setLoading(false);
      console.log('res ==>', res.result);
      res.result.start_time ? setData([res.result]) : setData([]);
    } else {
      setLoading(false);
      console.log('err ==>', res.error);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setActiveUser(user);
  };

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

  const styles = StyleSheet.create({
    domain: {
      zIndex: 100,
      width: '100%',
      height: 64,
      marginBottom: 10,
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 12,
      paddingLeft: 23,
      paddingRight: 30,
      justifyContent: 'space-between',
      backgroundColor: themes.subdomainBackgroundColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 6,
        height: 20,
      },
      shadowOpacity: 0.018,
      shadowRadius: 50,
    },

    domainText: {
      maxWidth: SIZES.width * 0.7,
      color: selectedUser ? themes.textColor : COLORS.mediumGray,
    },
  });

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={global.container}>
      <Header name={selectedUser ? selectedUser.name + ' ' + selectedUser.surname : 'Select Client'} role="client" backButtonEvent={goBack} />
      <Text style={[styles.domainText, { alignSelf: 'center', marginBottom: 30, marginTop: 25 }]}>Session history</Text>
      {Platform.OS === 'ios' && (
        <TouchableOpacity
          style={styles.domain}
          onPress={() => {
            inputRef.current.togglePicker();
          }}
        >
          {!usersLoading ? (
            <Text style={[global.p5dark, styles.domainText]}>{selectedUser ? selectedUser.name + ' ' + selectedUser.surname : 'Select client'}</Text>
          ) : (
            <ActivityIndicator color={themes.textColor} />
          )}
          <ArrowRight color={selectedUser ? themes.textColor : COLORS.mediumGray} />
          <RNPickerSelect
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            ref={inputRef}
            pickerProps={{
              style: {
                color: 'red',
              },
            }}
            style={iosPickerStyle}
            onValueChange={(value) => {
              setFocusedUser(users[value]);
            }}
            onDonePress={(e) => selectUser(focusedUser)}
            items={users.map((user, i) => {
              return {
                label: user.name + ' ' + user.surname,
                value: i,
                color: themes.textColor,
              };
            })}
          />
        </TouchableOpacity>
      )}
      {Platform.OS === 'android' && (
        <ModalSelector
          optionTextStyle={{
            color: themes.textColor,
            fontFamily: FONTS.sfRegular,
          }}
          optionContainerStyle={{
            backgroundColor: theme === 'dark' ? COLORS.darkAshPurple : '#FFFFFF',
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
            backgroundColor: theme === 'dark' ? COLORS.darkAshPurple : COLORS.white,
          }}
          cancelText="Close"
          cancelTextStyle={{
            color: COLORS.red,
            fontFamily: FONTS.sfRegular,
          }}
          data={users.map((user, i) => {
            return { label: user.name + ' ' + user.surname, key: i };
          })}
          initValue="Select client"
          onChange={(option) => {
            selectUser(users[option.key]);
          }}
        >
          <View style={styles.domain}>
            {!usersLoading ? (
              <Text style={[global.p5dark, styles.domainText]}>{selectedUser ? selectedUser.name + ' ' + selectedUser.surname : 'Select client'}</Text>
            ) : (
              <ActivityIndicator color={themes.textColor} />
            )}
            <ArrowRight color={selectedUser ? themes.textColor : COLORS.mediumGray} />
          </View>
        </ModalSelector>
      )}
      <TouchableOpacity
        style={styles.domain}
        onPress={() => {
          setOpen(true);
        }}
      >
        <Text style={styles.domainText}>
          {selectedDate ? selectedDate.getDate() + ' ' + displayDateMonth(selectedDate.getMonth()) + ' ' + selectedDate.getFullYear() : 'Date'}
        </Text>
        <SvgXml xml={date} stroke={selectedDate ? themes.textColor : COLORS.mediumGray} fill={selectedDate ? themes.textColor : COLORS.mediumGray} />
      </TouchableOpacity>
      <DatePicker
        style={{}}
        textColor={Appearance.getColorScheme() === 'dark' && Platform.OS === 'ios' ? themes.textColor : '#000000'}
        modal
        mode="date"
        open={open}
        date={selectedDate ? selectedDate : new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        androidVariant="iosClone"
      />
      <ScrollView style={{ flex: 1, marginBottom: 110 }} showsVerticalScrollIndicator={false}>
        {data.length && selectedUser && !loading
          ? data.map((el) => {
              return <Attempt key={el.doctor.id} el={el} client={selectedUser} navigation={navigation} />;
            })
          : null}
        {selectedDate && selectedUser && !data.length && !loading ? (
          <NoDataMessage
            style={{ position: 'relative', height: 'auto', marginTop: 30 }}
            themes={themes}
            text="Try changing searching options"
            header="No data found"
          />
        ) : null}
        {loading ? (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator color={themes.textColor} />
          </View>
        ) : null}
        {!selectedUser || !selectedDate ? (
          <Text
            style={{
              ...global.p5dark,
              color: themes.textColor,
              marginTop: SIZES.height * 0.1,
              opacity: 0.8,
              textAlign: 'center',
            }}
          >
            Fill in searching options to start the search.
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return { activeUser: dcmSelectors.getActiveUser(state) };
};

export default connect(mapStateToProps, {
  setActiveUser: dcmOperations.setActiveUser,
})(withGeneralBackground(History));
