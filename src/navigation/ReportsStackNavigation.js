import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DailyPlannersHistory from '../screens/General/DailyPlannersHistory/DailyPlannersHistory';
import AttemptHistory from '../screens/General/History/AttemptHistory';
import History from '../screens/General/History/History';
import ReportsScreen from '../screens/General/Reports/ReportsScreen';

const Stack = createNativeStackNavigator();

export default function ReportsStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="ReportsMenu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportsMenu" component={ReportsScreen} />
      <Stack.Screen name="History" component={History} options={{ gestureEnabled: false }} />
      <Stack.Screen name="AttemptHistory" component={AttemptHistory} />
      <Stack.Screen name="DailyPlannersHistory" component={DailyPlannersHistory} />
    </Stack.Navigator>
  );
}
