import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DailyPlanner, DailySchedule, Planner } from '../screens';

const Stack = createNativeStackNavigator();

export default function TherapistStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="PlannerMenu">
      <Stack.Screen name="PlannerMenu" component={Planner} options={{ headerShown: false }} />

      <Stack.Screen name="DailySchedule" component={DailySchedule} options={{ headerShown: false }} />
      <Stack.Screen name="DailyPlanner" component={DailyPlanner} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
