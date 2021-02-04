import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestTwoScreen from '../screens/TestTwoScreen';

export default function BathesNavigator(): JSX.Element {
  const Bathes = createStackNavigator();
  return (
    <Bathes.Navigator screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="TestScreen2" component={TestTwoScreen} />
    </Bathes.Navigator>
  );
}
