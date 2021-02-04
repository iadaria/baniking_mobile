import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestScreen from '~/navigation/screens/TestScreen';

export default function ProfileNavigator(): JSX.Element {
  const Profile = createStackNavigator();
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="TestScreen1" component={TestScreen} />
    </Profile.Navigator>
  );
}
