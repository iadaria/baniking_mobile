import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CabinetScreen } from '~/src/features/cabinet/screens';
import { ParamListBase, Route } from '@react-navigation/native';
import { useBackward } from '~/src/app/hooks/useBackward';

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Cabinet = createStackNavigator();

export default function CabinetNavigator({ navigation, route }: IScreenOptionsProps): JSX.Element {
  useBackward({ navigation, route });
  return (
    <Cabinet.Navigator screenOptions={{ headerShown: false }}>
      <Cabinet.Screen name="CabinetScreen" component={CabinetScreen} />
    </Cabinet.Navigator>
  );
}
