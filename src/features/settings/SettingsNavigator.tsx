import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {
  SettingsMenuScreen,
  // BaseSettingsScreen,
  SafeScreen,
  NotificationsScreen,
  RulesScreen,
  ContractScreen,
  HelpScreen,
} from './screens';
import { ParamListBase, Route } from '@react-navigation/native';
import { useBackward } from '~/src/app/hooks/useBackward';
import { ProfileScreen } from '../profiles/screens';

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Settings = createStackNavigator();

export default function SettingsNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {
  const screen = 'SettingsMenuScreen';
  const screens = [
    'ProfileScreen',
    'SafeScreen',
    'NotificationsScreen',
    'RulesScreen',
    'ContractScreen',
    'HelpScreen',
  ];
  useBackward({ navigation, route, screens, screen });

  return (
    <Settings.Navigator screenOptions={{ headerShown: false }}>
      <Settings.Screen name="SettingsMenuScreen" component={SettingsMenuScreen} />
      <Settings.Screen name="ProfileScreen" component={ProfileScreen} />
      <Settings.Screen name="SafeScreen" component={SafeScreen} />
      {/* <Settings.Screen name="BaseSettingsScreen" component={BaseSettingsScreen} /> */}
      <Settings.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Settings.Screen name="RulesScreen" component={RulesScreen} />
      <Settings.Screen name="ContractScreen" component={ContractScreen} />
      <Settings.Screen name="HelpScreen" component={HelpScreen} />
    </Settings.Navigator>
  );
}
