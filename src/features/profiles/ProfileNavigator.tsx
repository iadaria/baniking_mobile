import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CabinetScreen /* , ProfileScreen  */ } from '~/src/features/profiles/screens';
import { useBackward } from '../../app/hooks/useBackward';
import { ParamListBase, Route } from '@react-navigation/native';
import { NotificationsScreen } from '../settings/screens';

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}
const Profile = createStackNavigator();

export default function ProfileNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {
  /* const screens = ['CabinetScreen', 'ProfileScreen'];
  useBackward({ navigation, route, screens, screen: null }); */
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="CabinetScreen" component={CabinetScreen} />
      <Profile.Screen name="ProfileScreen" component={NotificationsScreen} />
    </Profile.Navigator>
  );
}
