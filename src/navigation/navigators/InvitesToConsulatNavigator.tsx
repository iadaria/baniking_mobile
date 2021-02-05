import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestTwoScreen from '../screens/TestTwoScreen';

export default function InvitesToConsulatNavigator(): JSX.Element {
  const InvitesToConsulat = createStackNavigator();
  return (
    <InvitesToConsulat.Navigator screenOptions={{ headerShown: false }}>
      <InvitesToConsulat.Screen name="TestScreen2" component={TestTwoScreen} />
    </InvitesToConsulat.Navigator>
  );
}
