import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { connect, useSelector, useDispatch } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { tabTherapist, tabActiveCircle, tabRecent, tabProfile } from '../assets/icons';
import { ErrorModal } from '../components';
import { SIZES } from '../constants';
// import PlannerStackNavigation from "../navigation/PlannerStackNavigation";
import SettingsStackNavigation from '../navigation/SettingsStackNavigation';
import TherapistStackNavigation from '../navigation/TherapistStackNavigation';
import authActions from '../redux/auth/authActions';
import authSelectors from '../redux/auth/authSelectors';
import ReportsStackNavigation from './ReportsStackNavigation';

const Tab = createBottomTabNavigator();
function BottomTabNavigation() {
    const isBottomTabHide = useSelector((state) => state.chart.isTabsVisible);
    const styles = StyleSheet.create({
    tabBar: {
      display: isBottomTabHide ? 'flex' : 'none',
      position: 'absolute',
      borderRadius: 12,

      transform: [
        {
          translateX: -(SIZES.width * 0.88) / 2,
        },
      ],
      backgroundColor: theme === 'light' ? 'rgba(228, 229, 235, 0.65)' : 'rgba(68, 74, 99, 0.65)',
      elevation: 0,
      width: SIZES.width * 0.88,
      height: 64,
      bottom: 38,
      borderTopWidth: 0,
      left: SIZES.width / 2,
      zIndex: 0,
    },
  });

  const error = useSelector((state) => state.auth.error);
  const theme = useSelector((state) => state.auth.theme);

  const dispatch = useDispatch();
  const clearError = () => {
    dispatch(authActions.clearError());
  };

  const tabBarIcon = (focused, icon) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // width: 40,
          // height: 40,
          // backgroundColor: "rgba(201, 225, 235, 0.08)",
          // borderRadius: 12,
        }}
      >
        {focused.focused && <SvgXml xml={tabActiveCircle} style={{ position: 'absolute', top: -13 }} />}
        <SvgXml xml={icon} fill="#FFFFFF" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: {
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Therapist"
          component={TherapistStackNavigation}
          options={{
            tabBarIcon: (focused) => {
              return tabBarIcon(focused, tabTherapist);
            },
            gestureEnable: false,
          }}
        />
        <Tab.Screen
          name="Reports"
          component={ReportsStackNavigation}
          options={{
            tabBarIcon: (focused) => {
              return tabBarIcon(focused, tabRecent);
            },
            gestureEnable: false,
          }}
        />
        {/* <Tab.Screen
        name="Planner"
        component={PlannerStackNavigation}
        options={{
          tabBarIcon: (focused) => {
            return tabBarIcon(focused, tabPlanner);
          },
          gestureEnable: false,
        }}
      /> */}
        <Tab.Screen
          name="Settings"
          component={SettingsStackNavigation}
          options={{
            tabBarIcon: (focused) => {
              return tabBarIcon(focused, tabProfile);
            },
            gestureEnable: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default BottomTabNavigation;
