import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from './screens';

const Cabinet = createStackNavigator();

export default function CabinetNavigator() {
  return (
    <Cabinet.Navigator screenOptions={{ headerShown: false }}>
      <Cabinet.Screen name="CabinetScreen" component={CabinetScreen} />
    </Cabinet.Navigator>
  );
}
