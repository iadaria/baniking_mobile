import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestTwoScreen from '../screens/TestTwoScreen';

export default function MyPatriciansNavigator(): JSX.Element {
  const MyPatricians = createStackNavigator();
  return (
    <MyPatricians.Navigator screenOptions={{ headerShown: false }}>
      <MyPatricians.Screen name="TestScreen2" component={TestTwoScreen} />
    </MyPatricians.Navigator>
  );
}
