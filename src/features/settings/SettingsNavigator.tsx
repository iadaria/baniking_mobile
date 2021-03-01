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
import { useBackward } from '../../app/hooks/useBackward';
import { ProfileScreen } from '../profiles/screens';

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Settings = createStackNavigator();

export default function SettingsNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {
  useBackward({ navigation, route });

  return (
    <Settings.Navigator screenOptions={{ headerShown: false }}>
      <Settings.Screen name="SafeScreen" component={SafeScreen} />
      <Settings.Screen name="ProfileScreen" component={ProfileScreen} />
      <Settings.Screen name="SettingsMenuScreen" component={SettingsMenuScreen} />
      {/* <Settings.Screen name="BaseSettingsScreen" component={BaseSettingsScreen} /> */}
      <Settings.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Settings.Screen name="RulesScreen" component={RulesScreen} />
      <Settings.Screen name="ContractScreen" component={ContractScreen} />
      <Settings.Screen name="HelpScreen" component={HelpScreen} />
    </Settings.Navigator>
  );
}
