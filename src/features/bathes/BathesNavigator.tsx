import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BathesScreen, BathScreen } from './screens';
import { DestinationMap } from './screens/DestinationMap';

export default function BathesNavigator(): JSX.Element {
  const Bathes = createStackNavigator();
  return (
    <Bathes.Navigator screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="BathesScreen" component={BathesScreen} />
      <Bathes.Screen name="BathScreen" component={BathScreen} />
      <Bathes.Screen name="DestinationMap" component={DestinationMap} />
    </Bathes.Navigator>
  );
}
