import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestTwoScreen from '../screens/TestTwoScreen';

export default function MeetingsNavigator(): JSX.Element {
  const Meetings = createStackNavigator();
  return (
    <Meetings.Navigator screenOptions={{ headerShown: false }}>
      <Meetings.Screen name="TestScreen2" component={TestTwoScreen} />
    </Meetings.Navigator>
  );
}
