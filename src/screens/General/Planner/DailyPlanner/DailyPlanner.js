import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import KeyboardListener from 'react-native-keyboard-listener';
import { SvgXml } from 'react-native-svg';
import { connect } from 'react-redux';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/core';
import { Formik } from 'formik';

import api_url from '../../../../api/api_url';
import { getToken } from '../../../../api/asyncStorage/token';
import { post } from '../../../../api/post';
import { okEmotion, thumbDownEmotion, thumbUpEmotion, download } from '../../../../assets/icons/Planner';
import { CustomButton, EmotionsList, Header, PlannerBoolean, PlannerInput } from '../../../../components';
import PopUp from '../../../../components/PopUp/PopUp';
import { COLORS, global } from '../../../../constants';
import { dailyPlannerData } from '../../../../data/DailyPlannerData';
import { EMOTIONS } from '../../../../data/emotionsData';
import withGeneralBackground from '../../../../hoc/withGeneralBackground';
import dcmSelectors from '../../../../redux/dcm/dcmSelectors';
import { formatDailyPlannerBody } from '../../../../utils/formDailyPlannerData';

const axios = require('axios').default;

const initialValues = {
  pointsOfFocus: '',
  goalsAndObjectives: '',
  experientalActivity: '',
  socialSkills: '',
  academicActivityPeriod: '',
  academicActivityDescription: '',
  cleaningAssignment: '',
  sessionPersonal: '',
  reward: '',
  behaviorReview: '',
  closerOrFurtherGoals: '',
  whyGoals: '',
  nameOfPlanner: '',
};

const ICONS = [
  { icon: thumbUpEmotion, name: 'experientalPositive' },
  { icon: okEmotion, name: 'experientalNeutral' },
  { icon: thumbDownEmotion, name: 'experientalBad' },
];

const initialBehavior = {
  experientalBehavior: '',
  socialSkillsBehavior: '',
  feelingBehavior: [],
};

const initialPresent = {
  academicActivity: null,
  cleaningAssignment: null,
  reward: null,
};

function DailyPlanner({ themes, navigation, user }) {
  const [behavior, setBehavior] = useState(initialBehavior);
  const [present, setPresent] = useState(initialPresent);
  const [defaultInputValues, setDefaultInputValues] = useState(initialValues);
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [submitAction, setSubmitAction] = useState(undefined);
  const [popup, setPopup] = useState(false);

  const scrollViewBottom = useBottomTabBarHeight();

  const postDailyPlanner = async (data) => {
    const token = await getToken();
    const plannerBody = formatDailyPlannerBody(data, user, behavior, present);
    setButtonLoading(true);

    axios
      .post(`${api_url}/set/daily`, JSON.stringify(plannerBody), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setButtonLoading(false);
        setSubmitAction(undefined);
        setBehavior(initialBehavior);
        setPresent(initialPresent);
        getDaily();
      })
      .catch(function (error) {
        console.log('set/daily error ->', error);
      });
  };

  const getDaily = async () => {
    let date = new Date();

    const body = {
      client_id: user.client_id,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    const res = await post('/get/daily', body);

    if (!res.error) {
      if (!!res.result) {
        const {
          focus,
          goals,
          experiental,
          experiental_behavior,
          social,
          social_behavior,
          academic_present,
          academic_header,
          academic_description,
          cleaning_present,
          cleaning_description,
          session,
          reward_present,
          reward_description,
          behavior_review,
          closer_to_goal_header,
          closer_to_goal_description,
          notes,
          feeling,
        } = res.result;

        setBehavior({ experientalBehavior: experiental_behavior, socialSkillsBehavior: social_behavior, feelingBehavior: feeling });
        setPresent({
          academicActivity: academic_present,
          cleaningAssignment: cleaning_present,
          reward: reward_present,
        });
        setDefaultInputValues({
          pointsOfFocus: focus,
          goalsAndObjectives: goals,
          experientalActivity: experiental,
          socialSkills: social,
          academicActivityPeriod: academic_header,
          academicActivityDescription: academic_description,
          cleaningAssignment: cleaning_description,
          sessionPersonal: session,
          reward: reward_description,
          behaviorReview: behavior_review,
          closerOrFurtherGoals: closer_to_goal_header,
          whyGoals: closer_to_goal_description,
          nameOfPlanner: notes,
        });
      }
    }
  };

  const saveDailyPlanner = async (data) => {
    await postDailyPlanner(data);
    if (submitAction === 'download') {
      Linking.openURL(`${api_url}/pdf/${user.client_id}`);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    getDaily();

    if (!isFocused) {
      navigation.goBack();
    }
  }, [user]);

  const styles = StyleSheet.create({
    formGroup: {
      marginBottom: 28,
    },
    label: {
      ...global.h5dark,
      color: themes.textColor,
      marginBottom: 14,
      marginLeft: 23,
    },
  });

  const showKeyboard = (value) => Platform.OS === 'android' && setKeyboardIsShown(value);

  const keyExtractor = (value) => value.split(' ').join('');

  const handleSubmitForm = (value, action) => {
    setSubmitAction(value);
    action();
    setPopup(true);
  };

  return (
    <SafeAreaView style={[global.container, { paddingTop: 15 }]}>
      <Header
        role="client"
        header="Daily planner"
        name={user && user.name + ' ' + user.surname}
        backButtonEvent={() => {
          navigation.goBack();
        }}
      />

      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <KeyboardListener
          onDidShow={() => showKeyboard(true)}
          onDidHide={() => showKeyboard(false)}
          onWillShow={() => {
            setKeyboardIsShown(true);
          }}
          onWillHide={() => {
            setKeyboardIsShown(false);
          }}
        />
        {loading && <ActivityIndicator color={themes.textColor} />}
        {!loading && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              padding: 2,
              paddingTop: 28,
              marginBottom: keyboardIsShown ? 0 : Platform.OS === 'android' ? scrollViewBottom + 40 : scrollViewBottom,
            }}
          >
            <Formik
              initialValues={defaultInputValues}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                saveDailyPlanner(values);
                setSubmitting(false);
                resetForm(initialValues);
              }}
              enableReinitialize
            >
              {({ handleChange, handleSubmit, values }) => {
                return (
                  <>
                    {dailyPlannerData.map((item) => (
                      <View style={styles.formGroup} key={keyExtractor(item.label)}>
                        <Text style={styles.label}>{item.label}</Text>
                        {item.planer && <PlannerBoolean present={present[item.presentValue]} setPresent={setPresent} name={item.presentValue} />}
                        {item.extraName && (
                          <View style={{ marginBottom: 10 }}>
                            <PlannerInput
                              placeholder={item.extraPlaceholder}
                              maxLength={item.extraPlaceholderLength}
                              value={values[item.extraName]}
                              onChangeText={handleChange(item.extraName)}
                            />
                          </View>
                        )}
                        {item.name && (
                          <PlannerInput
                            maxLength={item.maxLength}
                            multiline
                            placeholder={item.placeholder}
                            onChangeText={handleChange(item.name)}
                            value={values[item.name]}
                          />
                        )}
                        {item.icons && (
                          <EmotionsList
                            icons={item.emotionsValue === 'feelingBehavior' ? EMOTIONS : ICONS}
                            value={behavior[item.emotionsValue]}
                            setIcon={setBehavior}
                            name={item.emotionsValue}
                          />
                        )}
                      </View>
                    ))}
                    <TouchableOpacity
                      onPress={() => handleSubmitForm('download', handleSubmit)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 32,
                      }}
                    >
                      <Text
                        style={{
                          ...global.p5dark,
                          color: themes.textColor,
                          marginRight: 12,
                        }}
                      >
                        Download PDF
                      </Text>
                      <SvgXml xml={download} />
                    </TouchableOpacity>
                    <PopUp title="Saved successfully" visibility={popup} changeVisibility={setPopup} />
                    <View style={{ marginBottom: 100 }}>
                      <CustomButton
                        loading={buttonLoading}
                        text="Save"
                        gradient="thunder"
                        onPress={() => {
                          handleSubmitForm('save', handleSubmit);
                        }}
                      />
                    </View>
                  </>
                );
              }}
            </Formik>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return { user: dcmSelectors.getActiveUser(state) };
};

export default connect(mapStateToProps)(withGeneralBackground(DailyPlanner));
