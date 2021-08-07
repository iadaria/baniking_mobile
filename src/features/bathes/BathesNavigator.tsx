import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { BathesFilterScreen } from './screens/BathesFilterScreen';
import { BathesPhotosScreen } from './screens/BathesPhotosScreen';
import { BathesScreen, BathScreen } from './screens';
import { CitiesScreen } from '../cities/screens/CitiesScreen';
import { DestinationMap } from './screens/DestinationMap';
import { OrderCallScreen } from './screens/OrderCallScreen/OrderCallScreen';
import { IRootState } from '~/src/app/store/rootReducer';

const Bathes = createStackNavigator();

export default function BathesNavigator() {
  const { selectedCityId } = useSelector(({ persist }: IRootState) => persist);

  const isCity = !!selectedCityId;

  return (
    <Bathes.Navigator
      initialRouteName={isCity ? 'BathesScreen' : 'CityScreen'}
      //initialRouteName="CityScreen"
      //initialRouteName="BathesScreen"
      headerMode="screen"
      screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="BathesScreen" component={BathesScreen} />
      <Bathes.Screen name="CitiesScreen" component={CitiesScreen} />
      <Bathes.Screen name="BathesFilterScreen" component={BathesFilterScreen} />
      <Bathes.Screen name="OrderCallScreen" component={OrderCallScreen} />
      <Bathes.Screen name="BathesPhotosScreen" component={BathesPhotosScreen} />
      <Bathes.Screen name="BathScreen" component={BathScreen} />
      <Bathes.Screen name="DestinationMap" component={DestinationMap} />
    </Bathes.Navigator>
  );
}
