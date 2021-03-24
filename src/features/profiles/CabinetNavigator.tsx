import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, Route } from '@react-navigation/native';
import { useBackward } from '~/src/app/hooks/useBackward';
import { CabinetScreen } from './screens';

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Cabinet = createStackNavigator();

export default function CabinetNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {
  /* const backToScreen = null;
  const screens: string[] = [];
  useBackward({ navigation, route, screens, screen: backToScreen }); */
  return (
    <Cabinet.Navigator screenOptions={{ headerShown: false }}>
      <Cabinet.Screen name="CabinetScreen" component={CabinetScreen} />
    </Cabinet.Navigator>
  );
}
