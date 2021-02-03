import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TestScreen from '~/navigation/screens/TestScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Test"
        component={TestScreen}
        options={{ drawerLabel: 'Test' }}
      />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}
