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
import { AppText, Block } from '~/app/common/components/ui';
import {
  ProfileNavigator,
  BathesNavigator,
  ReceiptsNavigator,
  MeetingsNavigator,
  SettingsNavigator,
  QrNavigator,
} from '~/navigation/navigators';

interface ILabelProps {
  color?: string;
  focused: boolean;
  text?: string;
}

const Drawer = createDrawerNavigator();

function AppDrawerItem({ focused, text }: ILabelProps) {
  return focused ? (
    <Block style={{ alignSelf: 'flex-start' }}>
      <AppText header>{text}</AppText>
      <Block underline />
    </Block>
  ) : (
    <AppText header lightUltra>
      {text}
    </AppText>
  );
}

function CustomDrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{ color: 'white' }}
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
          // flex: 0,
          // alignSelf: 'flex-start',
          // backgroundColor: 'white',
        },
        inactiveTintColor: 'white',
        // activeTintColor: 'white',
        // activeBackgroundColor: 'blue',
      }}
      drawerStyle={drawerStyle}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
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
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}
