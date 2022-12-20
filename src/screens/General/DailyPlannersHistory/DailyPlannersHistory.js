import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Platform, TouchableOpacity, ActivityIndicator, Animated, Appearance, SafeAreaView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ModalSelector from 'react-native-modal-selector';
import RNPickerSelect from 'react-native-picker-select';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';

import { get } from '../../../api/get';
import { ArrowRight, date } from '../../../assets/icons';
import { Header, NoDataMessage, PlannerItem, Spinner } from '../../../components';
import { COLORS, FONTS, global, SIZES } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';

function DailyPlannersHistory({ theme, navigation, themes }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [focusedUser, setFocusedUser] = useState(null);
  const [planners, setPlanners] = useState([]);
  const [dateRange, setDateRange] = useState('');
  const [isOpenStartDatePicker, setIsOpenStartDatePicker] = useState(false);
  const [isOpenEndDatePicker, setIsOpenEndDatePicker] = useState(false);
  const today = new Date();

  const activeUser = useSelector((state) => state.dcm.activeUser);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const inputRef = useRef();
  const { name, surname } = activeUser;

  useEffect(() => {
    if (activeUser) {
      const startDate = dayjs(dateRange.startDate).format('YYYY-MM-DD');
      const endDate = dayjs(dateRange.endDate).format('YYYY-MM-DD');

      getDailyPlanner(startDate, endDate);
    }
  }, [dateRange?.endDate, dateRange?.startDate, selectedUser]);

  useEffect(() => {
    setLoading(false);
  }, [planners]);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    setUsersLoading(true);
    let res = await get('/clients');
    if (!res.error) {
      setUsersLoading(false);
      setUsers(res.result.data);
    }
  };

  const getDailyPlanner = async (startDate, endDate) => {
    const res = await get(`/list/${selectedUser?.client_id}?start_date=\'${startDate}\'&end_date=\'${endDate}\'`);
    setPlanners(res.result);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  const renderItem = ({ item }) => (
    <PlannerItem clientId={selectedUser?.client_id} name={currentUser?.name} surname={currentUser?.surname} date={item.create_date} />
  );

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

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      marginBottom: 10,
    },
    text: {
      marginTop: 50,
      textAlign: 'center',
    },
  });

  const handleTogglePicker = () => inputRef.current.togglePicker();

  const handleSetFocusedUser = (value) => setFocusedUser(users[value]);

  const confirmStartDatePicker = (date) => {
    setIsOpenStartDatePicker(false);
    setDateRange((prevState) => ({ ...prevState, startDate: date }));
  };

  const confirmEndDatePicker = (date) => {
    setIsOpenEndDatePicker(false);
    setDateRange((prevState) => ({ ...prevState, endDate: date }));
  };

  const cancelStartDatePicker = () => setIsOpenStartDatePicker(false);

  const cancelEndDatePicker = () => setIsOpenEndDatePicker(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatDate = (date) => {
    return dayjs(date).format('DD MMMM YYYY');
  };

  const handleOpenStartDatePicker = () => setIsOpenStartDatePicker(true);
  const handleOpenEndDatePicker = () => setIsOpenEndDatePicker(true);

  return (
    <SafeAreaView style={[global.safeAreaContainer]}>
      {loading && <Spinner color={themes.textColor} />}

      <View style={styles.header}>
        <Text style={[global.p5dark, { color: themes.textColor, textAlign: 'center' }]}>Daily planners</Text>
      </View>
      <Header theme={theme} name={name + ' ' + surname} role={'client'} backButtonEvent={handleGoBack} />
      <View style={{ marginTop: 50 }}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity style={styles.domain} onPress={handleTogglePicker}>
            {!usersLoading ? (
              <Text style={[global.p5dark, styles.domainText]}>{selectedUser ? selectedUser.name + ' ' + selectedUser.surname : 'Select client'}</Text>
            ) : (
              <ActivityIndicator color={themes.textColor} />
            )}
            <ArrowRight color={selectedUser ? themes.textColor : COLORS.mediumGray} />
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              ref={inputRef}
              pickerProps={{
                style: {
                  color: 'red',
                },
              }}
              style={iosPickerStyle}
              onValueChange={(value) => handleSetFocusedUser(value)}
              onDonePress={() => selectUser(focusedUser)}
              items={users.map((user, i) => ({
                label: user.name + ' ' + user.surname,
                value: i,
                color: themes.textColor,
              }))}
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
            data={users.map((user, i) => ({ label: user.name + ' ' + user.surname, key: i }))}
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
        <TouchableOpacity style={styles.domain} onPress={handleOpenStartDatePicker}>
          <Text style={styles.domainText}>
            {!!dateRange && !!dateRange.startDate ? formatDate(dateRange?.startDate) : 'Select the start date of the range'}
          </Text>
          <SvgXml
            xml={date}
            stroke={dateRange?.startDate ? themes.textColor : COLORS.mediumGray}
            fill={dateRange?.startDate ? themes.textColor : COLORS.mediumGray}
          />
        </TouchableOpacity>
        <Animated.View>
          <DatePicker
            textColor={Appearance.getColorScheme() === 'dark' && Platform.OS === 'ios' ? themes.textColor : '#000000'}
            modal
            mode="date"
            open={isOpenStartDatePicker}
            date={today}
            onConfirm={(date) => confirmStartDatePicker(date)}
            onCancel={cancelStartDatePicker}
            androidVariant="iosClone"
            maximumDate={!!dateRange?.endDate ? dateRange?.endDate : today}
          />
        </Animated.View>
        <TouchableOpacity style={styles.domain} onPress={handleOpenEndDatePicker}>
          <Text style={styles.domainText}>{!!dateRange && dateRange.endDate ? formatDate(dateRange?.endDate) : 'Select the end date of the range'}</Text>
          <SvgXml
            xml={date}
            stroke={dateRange?.endDate ? themes.textColor : COLORS.mediumGray}
            fill={dateRange?.endDate ? themes.textColor : COLORS.mediumGray}
          />
        </TouchableOpacity>
        <Animated.View>
          <DatePicker
            textColor={Appearance.getColorScheme() === 'dark' && Platform.OS === 'ios' ? themes.textColor : '#000000'}
            modal
            mode="date"
            open={isOpenEndDatePicker}
            date={today}
            onConfirm={(date) => confirmEndDatePicker(date)}
            onCancel={cancelEndDatePicker}
            androidVariant="iosClone"
            minimumDate={dateRange?.startDate}
            maximumDate={today}
          />
        </Animated.View>
      </View>
      {((planners?.length && !dateRange.startDate) || !planners?.length) && !loading && (
        <NoDataMessage text="No planners in the list" themes={themes} style={{ position: 'relative', height: 'auto', marginTop: 30 }} />
      )}
      {!!dateRange.startDate && !!planners?.length && !loading && (
        <FlatList data={planners} renderItem={renderItem} showsVerticalScrollIndicator={false} style={{ marginBottom: '20%' }} />
      )}
    </SafeAreaView>
  );
}

export default withGeneralBackground(DailyPlannersHistory);
