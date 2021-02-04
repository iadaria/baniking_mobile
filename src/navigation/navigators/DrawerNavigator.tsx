import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TestScreen from '~/navigation/screens/TestScreen';
import { drawerStyle } from '~/navigation/defaultTheme';
import { AppText } from '~/app/common/components/ui';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerStyle={drawerStyle}>
      <Drawer.Screen
        name="Test"
        component={TestScreen}
        options={{
          drawerLabel: () => <AppText>Test</AppText>, //'Test'
        }}
      />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}
