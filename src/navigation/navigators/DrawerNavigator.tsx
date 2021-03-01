import React, { useEffect } from 'react';
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
import { appDrawerItemStyle, appDrawerStyle } from '../components/appDefaultTheme';
import { useSelector } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import routes from '~/src/navigation/helpers/routes';

interface ILabelProps {
  color: string;
  focused: boolean;
}

const Drawer = createDrawerNavigator();

interface IScreenOptionsProps {
  // route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export default function DrawerNavigator({ navigation }: IScreenOptionsProps) {
  const { authenticated } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (!authenticated) {
      navigation.navigate(routes.navigators.AuthNavigator);
    }
  }, [authenticated, navigation]);

  return (
    <Drawer.Navigator
      // initialRouteName="SettingsTab"
      // https://reactnavigation.org/docs/4.x/drawer-navigator/#drawernavigatorconfig
      screenOptions={{
        unmountOnBlur: true,
        /* useImperativeHandle(
          ref,
          () => {
            handler
          },
          [input],
        ) */
      }}
      drawerContentOptions={{
        itemStyle: appDrawerItemStyle,
      }}
      drawerStyle={appDrawerStyle}
      drawerContent={(props) => <AppDrawerContent {...props} />}>
      <Drawer.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => <AppDrawerItem text="Личный кабинет" {...props} />,
        }}
      />
      <Drawer.Screen
        name="BathesTab"
        component={BathesNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => <AppDrawerItem text="Каталог бань" {...props} />,
        }}
      />
      <Drawer.Screen
        name="MeetingsTab"
        component={MeetingsNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => <AppDrawerItem text="Собрания" {...props} />,
        }}
      />
      <Drawer.Screen
        name="ReceiptsTab"
        component={ReceiptsNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => <AppDrawerItem text="Чеки" {...props} />,
        }}
      />
      <Drawer.Screen
        name="SettingsTab"
        component={SettingsNavigator}
        options={{
          drawerLabel: (props: ILabelProps) => <AppDrawerItem text="Настройки" {...props} />,
        }}
      />
      <Drawer.Screen
        name="QrTab"
        component={QrNavigator}
        options={
          (/* props: IScreenOptionsProps */) => {
            // console.log('[Drawer.Screen] ** canBack', props.navigation.canGoBack());
            return {
              drawerLabel: (props: ILabelProps) => <AppDrawerItem text="QR" {...props} />,
            };
          }
        }
      />
    </Drawer.Navigator>
  );
}
