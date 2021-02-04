import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestTwoScreen from '../screens/TestTwoScreen';

export default function SettingsNavigator(): JSX.Element {
  const Settings = createStackNavigator();
  return (
    <Settings.Navigator screenOptions={{ headerShown: false }}>
      <Settings.Screen name="TestScreen2" component={TestTwoScreen} />
    </Settings.Navigator>
  );
}
