import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestScreen from '~/navigation/screens/TestScreen';
import LoginScreen from '../screens/auth/LoginScreen';

export default function ProfileNavigator(): JSX.Element {
  const Profile = createStackNavigator();
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="LoginScreen" component={LoginScreen} />
      <Profile.Screen name="TestScreen1" component={TestScreen} />
    </Profile.Navigator>
  );
}
