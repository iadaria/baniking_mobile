import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from '~/src/features/cabinet/screens';

export default function CabinetNavigator(): JSX.Element {
  const Cabinet = createStackNavigator();
  return (
    <Cabinet.Navigator screenOptions={{ headerShown: false }}>
      <Cabinet.Screen name="CabinetScreen" component={CabinetScreen} />
    </Cabinet.Navigator>
  );
}
