import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BathesScreen, BathScreen } from './screens';
import { DestinationMap } from './screens/DestinationMap';
import { BathesFilterScreen } from './screens/BathesFilterScreen';
import { BathesPhotosScreen } from './screens/BathesPhotosScreen';
import { OrderCallScreen } from './screens/OrderCallScreen/OrderCallScreen';

export default function BathesNavigator() {
  const Bathes = createStackNavigator();
  return (
    <Bathes.Navigator
      headerMode="screen"
      screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="BathesScreen" component={BathesScreen} />
      <Bathes.Screen name="BathesFilterScreen" component={BathesFilterScreen} />
      <Bathes.Screen name="OrderCallScreen" component={OrderCallScreen} />
      <Bathes.Screen name="BathesPhotosScreen" component={BathesPhotosScreen} />
      <Bathes.Screen name="BathScreen" component={BathScreen} />
      <Bathes.Screen name="DestinationMap" component={DestinationMap} />
    </Bathes.Navigator>
  );
}
