import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Settings, FAQ, PersonalSettings, Support, TermsOfService } from '../screens';
import CompanyResources from '../screens/General/Settings/CompanyResources';
import ContactUs from '../screens/General/Settings/ContactUs';

const Stack = createNativeStackNavigator();

export default function SettingsStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="SettingsMenu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMenu" component={Settings} />
      <Stack.Screen name="PersonalSettings" component={PersonalSettings} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="CompanyResources" component={CompanyResources} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} />
    </Stack.Navigator>
  );
}
