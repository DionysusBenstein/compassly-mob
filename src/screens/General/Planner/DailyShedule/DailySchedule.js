import React, { useEffect, useRef, useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Animated, ScrollView, ActivityIndicator, PanResponder, RefreshControl } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { get } from '../../../../api/get';
import { linkButton } from '../../../../assets/icons/Planner';
import { Gradient, Header, NoDataMessage } from '../../../../components';
import { global } from '../../../../constants';
import withGeneralBackground from '../../../../hoc/withGeneralBackground';
import { splitTime, toTwelveHour } from '../../../../utils/changeTimeFormat';

dayjs.extend(weekOfYear);

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function DailySchedule({ navigation, themes, theme }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(dayjs(new Date()).week());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const calendarIsExpanded = useRef(true);
  const [refreshing, setRefreshing] = useState(false);

  const defaultHeightValue = 350;
  const defaultClosedHeightValue = 130;
  const calendarHeight = useRef(new Animated.Value(defaultHeightValue)).current;
  const calendarOpacity = useRef(new Animated.Value(1)).current;

  const calendarTheme = {
    textDayHeaderFontWeight: '500',
    textMonthFontWeight: '500',
    calendarBackground: 'transparent',
    textSectionTitleColor: themes.textColor,
    arrowColor: themes.textColor,
    monthTextColor: themes.textColor,
    dayTextColor: themes.textColor,
    textDisabledColor: themes.disabledTextColor,
  };

  const calculateHeight = (pageY) => {
    if (calendarIsExpanded.current && calendarHeight._value <= defaultHeightValue && calendarHeight._value > 100) {
      let height = defaultHeightValue + pageY;
      Animated.timing(calendarHeight, {
        toValue: height,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(calendarOpacity, {
        toValue: calendarHeight._value / defaultHeightValue,
        duration: 0,
        useNativeDriver: false,
      }).start();
    } else if (!calendarIsExpanded.current && calendarHeight._value <= defaultHeightValue && calendarHeight._value > 100) {
      !calendarIsExpanded.current && calendarHeight._value > defaultClosedHeightValue && setIsExpanded(true);
      let height = defaultClosedHeightValue + pageY;
      Animated.timing(calendarOpacity, {
        toValue: calendarHeight._value / defaultHeightValue,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(calendarHeight, {
        toValue: height,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const releaseResponder = () => {
    Animated.timing(calendarOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    if (calendarHeight._value < defaultHeightValue / 1.5) {
      calendarIsExpanded.current = false;
      setIsExpanded(false);
      Animated.timing(calendarHeight, {
        toValue: defaultClosedHeightValue,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      calendarIsExpanded.current = true;
      setIsExpanded(true);
      Animated.timing(calendarHeight, {
        toValue: defaultHeightValue,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (e, gestureState) => {
        releaseResponder();
      },
      onPanResponderMove: (e, gestureState) => {
        calculateHeight(gestureState.dy);
      },
    })
  ).current;

  const listOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedDate && activeUser) {
      setLoading(true);
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
      getData().then(() => setLoading(false));
    }
  }, [selectedDate, activeUser]);

  const activeUser = useSelector((state) => state.dcm.activeUser);

  const getData = async () => {
    const res = await get(`/calendar/${selectedDate}/${activeUser.client_id}`);
    if (!res.error) {
      setData(res.result.data);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  const renderDay = (date, state) => {
    return dayjs(date.dateString).week() === selectedWeek || isExpanded ? (
      <TouchableOpacity
        style={styles.calendarDay}
        onPress={() => {
          setSelectedDate(date.dateString);
          setSelectedWeek(dayjs(date.dateString).week());
        }}
      >
        <View style={styles.calendarGradient}>{selectedDate === date.dateString && <Gradient style="violet" />}</View>
        {!isExpanded && <Text style={styles.calendarDayName}>{days[new Date(date.timestamp).getDay()]}</Text>}
        <Text
          style={{
            textAlign: 'center',
            color: state === 'disabled' ? themes.disabledTextColor : selectedDate === date.timestamp ? '#FFFFFF' : themes.textColor,
          }}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    ) : null;
  };

  const styles = StyleSheet.create({
    calendarText: {
      ...global.h5dark,
      color: themes.textColor,
    },
    calendarHeader: {
      marginBottom: !isExpanded ? 15 : 0,
      justifyContent: 'flex-start',
      width: !isExpanded ? '100%' : 'auto',
      flexDirection: 'row',
      alignItems: 'center',
    },
    calendarDay: {
      width: 43,
      height: !isExpanded ? 50 : 39,
      overflow: 'hidden',
      justifyContent: 'center',
      borderRadius: 30,
      alignItems: 'center',
    },
    calendarDayName: {
      ...global.p7dark,
      color: themes.textColor,
      marginBottom: 5,
    },
    calendarGradient: {
      borderRadius: 30,
      width: '100%',
      height: '200%',
      position: 'absolute',
    },
    calendarArrow: {
      marginLeft: 19,
    },
    calendarExpandButton: {
      width: '100%',
      height: 35,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 0,
    },
    calendarExpandButtonLine: {
      width: 21,
      height: 2,
      backgroundColor: themes.textColor,
      borderRadius: 2,
    },
  });

  return (
    <SafeAreaView style={[global.container, { marginBottom: 110 }]}>
      <Header
        header="Day treatment schedule"
        backButtonEvent={() => {
          navigation.goBack();
        }}
        role="client"
      />
      <Animated.View style={{ height: calendarHeight, overflow: 'hidden', marginTop: 15 }}>
        {theme === 'dark' && isExpanded && <Gradient style="transparentWhite2" borderTopRadius={12} borderBottomRadius={12} />}
        <Animated.View style={{ opacity: calendarOpacity }}>
          <Calendar
            onMonthChange={(e) => {
              setSelectedWeek(dayjs(e.dateString).week());
            }}
            hideDayNames={!isExpanded && true}
            hideArrows={!isExpanded && true}
            dayComponent={({ date, state }) => {
              return renderDay(date, state);
            }}
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: theme === 'dark' ? 'transparent' : 'rgba(255,255,255, 0.5)',
              paddingVertical: !isExpanded ? 0 : 14,
            }}
            theme={calendarTheme}
          />
        </Animated.View>
        <View style={styles.calendarExpandButton} {...panResponder.panHandlers}>
          <View style={[styles.calendarExpandButtonLine, { marginBottom: 5 }]}></View>
          <View style={styles.calendarExpandButtonLine}></View>
        </View>
      </Animated.View>
      {loading && <ActivityIndicator color={themes.textColor} style={{ marginTop: 40 }} />}
      {!data.length && !loading && (
        <View
          style={{
            height: 150,
            width: '100%',
            marginTop: 30,
          }}
        >
          <NoDataMessage text="Try changing searching options" themes={themes} />
        </View>
      )}

      {!!data.length && !loading && (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Animated.View style={{ opacity: listOpacity }}>
            {data.map((el, i) => {
              return (
                <Animated.View
                  key={el.startdate + el.starttime + i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 25,
                    paddingHorizontal: 12,
                    borderBottomColor: 'rgba(255,255,255, 0.2)',
                    borderBottomWidth: 1,
                  }}
                >
                  <View
                    style={{
                      color: themes.textColor,
                      textAlign: 'center',
                    }}
                  >
                    <Text style={{ ...global.h5dark, color: themes.textColor }}>{splitTime(el.starttime)}</Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: themes.textColor,
                      }}
                    >
                      -
                    </Text>
                    <Text style={[global.h5dark, { flexBasis: '14%', color: themes.textColor }]}>{splitTime(el.endtime)}</Text>
                  </View>
                  <Text style={[global.p5dark, { color: themes.textColor, flexBasis: '51%' }]}>{el.title}</Text>
                  <TouchableOpacity>
                    <SvgXml xml={linkButton} />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </Animated.View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default withGeneralBackground(DailySchedule);
