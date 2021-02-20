import React, { useEffect } from 'react';
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
import { ParamListBase, Route } from '@react-navigation/native';
import { useBackward } from '../../app/hooks/useBackward';

/* interface IAppScreenOptionsProps {
  navigation: StackNavigationProp<ParamListBase>;
} */

/* const appScreenOptions = ({ navigation }: IAppScreenOptionsProps) => {
  return {
    headerLeft: () => <HeaderBackward navigation={navigation} />,
  };
}; */

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Settings = createStackNavigator();

export default function SettingsNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {
  useBackward({ navigation, route });

  return (
    <Settings.Navigator
      screenOptions={{ headerShown: false }}
      /* screenOptions={(props: IScreenOptionsProps) => {
        console.log('** canBack', props.navigation.canGoBack());
        return {
          // headerShown: false,
        };
      }} */
      initialRouteName="SettingsMenuScreen">
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
