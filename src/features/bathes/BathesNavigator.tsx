import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { BathesScreen, BathScreen } from './screens';
import { DestinationMap } from './screens/DestinationMap';
import { ParamListBase, Route } from '@react-navigation/native';
import { useBackward } from '~/src/app/hooks/useBackward';
import { BathesFilterScreen } from './screens/BathesFilterScreen';

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export default function BathesNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {
  const screens = ['BathScreen', 'BathesFilterScreen'];

  useBackward({ navigation, route, screens, screen: 'BathesScreen' });
  useBackward({ navigation, route, screens: ['DestinationMap'], screen: 'BathScreen' });

  const Bathes = createStackNavigator();
  return (
    <Bathes.Navigator screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="BathesScreen" component={BathesScreen} />
      <Bathes.Screen name="BathScreen" component={BathScreen} />
      <Bathes.Screen name="DestinationMap" component={DestinationMap} />
      <Bathes.Screen name="BathesFilterScreen" component={BathesFilterScreen} />
    </Bathes.Navigator>
  );
}
