import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { QrScreen } from '~/src/features/profiles/screens/QrScreen/QrScreen';

export default function QrNavigator(): JSX.Element {
  const Qr = createStackNavigator();
  return (
    <Qr.Navigator screenOptions={{ headerShown: false }}>
      <Qr.Screen name="QrScreen" component={QrScreen} />
    </Qr.Navigator>
  );
}
