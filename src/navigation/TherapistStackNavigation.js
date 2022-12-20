import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PlannerStackNavigation from '../navigation/PlannerStackNavigation';
import Chart2 from '../screens/General/Therapist/Chart2/Chart2';
import SeeAll from '../screens/General/Therapist/SeeAll';
import Sessions from '../screens/General/Therapist/Sessions';
import UserList from '../screens/General/Therapist/UserList';

const Stack = createNativeStackNavigator();

export default function TherapistStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="UserList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserList" component={UserList} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Sessions" component={Sessions} />

      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="Chart" component={Chart2} />
      <Stack.Screen name="Planner" component={PlannerStackNavigation} />
    </Stack.Navigator>
  );
}
