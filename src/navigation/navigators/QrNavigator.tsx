import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestTwoScreen from '../screens/TestTwoScreen';

export default function QrNavigator(): JSX.Element {
  const Qr = createStackNavigator();
  return (
    <Qr.Navigator screenOptions={{ headerShown: false }}>
      <Qr.Screen name="TestScreen2" component={TestTwoScreen} />
    </Qr.Navigator>
  );
}
