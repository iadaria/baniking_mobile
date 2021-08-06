import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BathesScreen, BathScreen } from './screens';
import { DestinationMap } from './screens/DestinationMap';
import { BathesFilterScreen } from './screens/BathesFilterScreen';
import { BathesPhotosScreen } from './screens/BathesPhotosScreen';
import { OrderCallScreen } from './screens/OrderCallScreen/OrderCallScreen';
import { useSelector } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';
import CityScreen from '../cities/screens/CityScreen';

const Bathes = createStackNavigator();

export default function BathesNavigator() {
  const { selectedCity } = useSelector(({ city }: IRootState) => city);

  const isCity = !!selectedCity;

  return (
    <Bathes.Navigator
      initialRouteName={isCity ? 'BathesScreen' : 'CityScreen'}
      headerMode="screen"
      screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="BathesScreen" component={BathesScreen} />
      <Bathes.Screen name="CityScreen" component={CityScreen} />
      <Bathes.Screen name="BathesFilterScreen" component={BathesFilterScreen} />
      <Bathes.Screen name="OrderCallScreen" component={OrderCallScreen} />
      <Bathes.Screen name="BathesPhotosScreen" component={BathesPhotosScreen} />
      <Bathes.Screen name="BathScreen" component={BathScreen} />
      <Bathes.Screen name="DestinationMap" component={DestinationMap} />
    </Bathes.Navigator>
  );
}
