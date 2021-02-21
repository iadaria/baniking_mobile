import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen, ProfileScreen } from '~/src/features/profiles/screens';

export default function ProfileNavigator(): JSX.Element {
  const Profile = createStackNavigator();
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="ProfileScreen" component={CabinetScreen} />
      <Profile.Screen name="ProfileScreen" component={ProfileScreen} />
    </Profile.Navigator>
  );
}
