import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SettingsMenuScreen,
  BaseSettingsScreen,
  SafeScreen,
  NotificationsScreen,
  RulesScreen,
  ContractScreen,
  HelpScreen,
} from './screens';

export default function SettingsNavigator(): JSX.Element {
  const Settings = createStackNavigator();
  return (
    <Settings.Navigator screenOptions={{ headerShown: false }}>
      <Settings.Screen name="SettingsMenuScreen" component={SettingsMenuScreen} />
      <Settings.Screen name="BaseSettingsScreen" component={BaseSettingsScreen} />
      <Settings.Screen name="SafeScreen" component={SafeScreen} />
      <Settings.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Settings.Screen name="RulesScreen" component={RulesScreen} />
      <Settings.Screen name="ContractScreen" component={ContractScreen} />
      <Settings.Screen name="HelpScreen" component={HelpScreen} />
    </Settings.Navigator>
  );
}
