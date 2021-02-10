import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  ProfileNavigator,
  BathesNavigator,
  ReceiptsNavigator,
  MeetingsNavigator,
  SettingsNavigator,
  QrNavigator,
} from '~/src/navigation/navigators';
import { AppDrawerItem } from '../components/AppDrawerItem';
import { AppDrawerContent } from '../components/AppDrawerContent';
import { appDrawerItemStyle, appDrawerStyle } from '../appDefaultTheme';

interface ILabelProps {
  color: string;
  focused: boolean;
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(/* { navigation, route }: any */) {

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        itemStyle: appDrawerItemStyle,
      }}
      drawerStyle={appDrawerStyle}
      drawerContent={(props) => <AppDrawerContent {...props} />}>
      <Drawer.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => (
            <AppDrawerItem text="Личный кабинет" {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name="BathesTab"
        component={BathesNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => (
            <AppDrawerItem text="Каталог бань" {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name="MeetingsTab"
        component={MeetingsNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => (
            <AppDrawerItem text="Собрания" {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name="ReceiptsTab"
        component={ReceiptsNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => (
            <AppDrawerItem text="Чеки" {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsTab"
        component={SettingsNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => (
            <AppDrawerItem text="Настройки" {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name="QrTab"
        component={QrNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => (
            <AppDrawerItem text="QR" {...props} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
