import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { BathesFilterScreen } from '../filters/screens/BathesFilterScreen';
import { BathesPhotosScreen } from './screens/BathesPhotosScreen';
import { BathesScreen, BathScreen } from './screens';
import { SelectCityScreen } from '../cities/screens/SelectCityScreen';
import { DestinationMap } from './screens/DestinationMap';
import { OrderCallScreen } from './screens/OrderCallScreen/OrderCallScreen';
import { IRootState } from '~/src/app/store/rootReducer';

const Bathes = createStackNavigator();

export default function BathesNavigator() {
  const { selectedCityName } = useSelector(
    ({ persist }: IRootState) => persist,
  );

  const isCity = !!selectedCityName;

  return (
    <Bathes.Navigator
      //initialRouteName={isCity ? 'BathesScreen' : 'CityScreen'}
      //initialRouteName="CitiesScreen"
      initialRouteName="BathesScreen"
      headerMode="screen"
      screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="BathesScreen" component={BathesScreen} />
      <Bathes.Screen name="CitiesScreen" component={SelectCityScreen} />
      <Bathes.Screen name="BathesFilterScreen" component={BathesFilterScreen} />
      <Bathes.Screen name="OrderCallScreen" component={OrderCallScreen} />
      <Bathes.Screen name="BathesPhotosScreen" component={BathesPhotosScreen} />
      <Bathes.Screen name="BathScreen" component={BathScreen} />
      <Bathes.Screen name="DestinationMap" component={DestinationMap} />
    </Bathes.Navigator>
  );
}
