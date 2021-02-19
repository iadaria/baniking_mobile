import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {
  SettingsMenuScreen,
  BaseSettingsScreen,
  SafeScreen,
  NotificationsScreen,
  RulesScreen,
  ContractScreen,
  HelpScreen,
} from './screens';
import { ParamListBase } from '@react-navigation/native';
import { HeaderBackward } from '~/src/navigation/components/headerButtons';

interface IAppScreenOptionsProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const appScreenOptions = ({ navigation }: IAppScreenOptionsProps) => {
  return {
    headerLeft: () => <HeaderBackward navigation={navigation} />,
  };
};

export default function SettingsNavigator(): JSX.Element {
  const Settings = createStackNavigator();
  return (
    <Settings.Navigator screenOptions={{ headerShown: false }} >
      <Settings.Screen name="SettingsMenuScreen" component={SettingsMenuScreen} />
      <Settings.Screen options={appScreenOptions} name="BaseSettingsScreen" component={BaseSettingsScreen} />
      <Settings.Screen name="SafeScreen" component={SafeScreen} />
      <Settings.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Settings.Screen name="RulesScreen" component={RulesScreen} />
      <Settings.Screen name="ContractScreen" component={ContractScreen} />
      <Settings.Screen name="HelpScreen" component={HelpScreen} />
    </Settings.Navigator>
  );
}
