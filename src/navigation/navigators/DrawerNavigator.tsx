import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { drawerStyle } from '~/navigation/defaultTheme';
import {
  ProfileNavigator,
  BathesNavigator,
  ReceiptsNavigator,
  MeetingsNavigator,
  SettingsNavigator,
  QrNavigator,
} from '~/navigation/navigators';
import { debugStyle } from '~/app/common/constants/app-styles';
import { AppDrawerItem } from '../components/AppDrawerItem';
import { AppLogoItem } from '../components/AppLogoItem';


interface ILabelProps {
  color: string;
  focused: boolean;
}

const Drawer = createDrawerNavigator();

function AppDrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={(props) => <AppLogoItem />}
        onPress={() => alert('Link to help')}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        // labelStyle={{ color: 'white' }}
        label={(props) => <AppDrawerItem text="Выйти" {...props} />}
        onPress={() => alert('Link to help')}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator(/* { navigation, route } */) {
  return (
    <Drawer.Navigator
      /* screenOptions={{
        headerShown: true,
      }} */
      drawerContentOptions={{
        itemStyle: {
          // ...debugStyle,
        },
        inactiveTintColor: 'white',
        // activeTintColor: 'white',
        // activeBackgroundColor: 'blue',
      }}
      drawerStyle={drawerStyle}
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
