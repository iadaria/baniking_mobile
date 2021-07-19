import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from '~/src/features/profiles/screens';
import { NotificationsScreen } from '../settings/screens';

const Profile = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="CabinetScreen" component={CabinetScreen} />
      <Profile.Screen name="ProfileScreen" component={NotificationsScreen} />
    </Profile.Navigator>
  );
}
