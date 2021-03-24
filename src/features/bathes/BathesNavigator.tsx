import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { BathesScreen, BathScreen } from './screens';
import { DestinationMap } from './screens/DestinationMap';
import { ParamListBase, Route } from '@react-navigation/native';
import { useBackward } from '~/src/app/hooks/useBackward';

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export default function BathesNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {

  useBackward({ navigation, route, screens: ['BathScreen'], screen: 'BathesScreen' });
  useBackward({ navigation, route, screens: ['DestinationMap'], screen: 'BathScreen' });

  const Bathes = createStackNavigator();
  return (
    <Bathes.Navigator screenOptions={{ headerShown: false }}>
      <Bathes.Screen name="BathesScreen" component={BathesScreen} />
      <Bathes.Screen name="BathScreen" component={BathScreen} />
      <Bathes.Screen name="DestinationMap" component={DestinationMap} />
    </Bathes.Navigator>
  );
}
