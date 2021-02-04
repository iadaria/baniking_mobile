import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestTwoScreen from '../screens/TestTwoScreen';

export default function ReceiptsNavigator(): JSX.Element {
  const Receipts = createStackNavigator();
  return (
    <Receipts.Navigator screenOptions={{ headerShown: false }}>
      <Receipts.Screen name="TestScreen2" component={TestTwoScreen} />
    </Receipts.Navigator>
  );
}
