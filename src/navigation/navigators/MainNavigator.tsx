import React, { useState } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../app/store/rootReducer';
// import { IAuthState } from '../../features/auth/authReducer';
import { DrawerActions } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import { defaultScreenOptions } from '../defaultTheme';
import {
  HeaderLeftClose,
  HeaderLeftOpen,
  HeaderRightButton,
} from '~/navigation/components/headerButtons';
import { ParamListBase, Route } from '@react-navigation/native';
import AppHeaderTitle from '../components/AppHeaderTitle';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export default function MainNavigator() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  function onOpenDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.openDrawer());
    setIsDrawerOpen(true);
  }

  function onCloseDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.closeDrawer());
    setIsDrawerOpen(false);
  }

  const Main = createStackNavigator();
  return (
    <Main.Navigator
      screenOptions={({ navigation }: IProps) => {
        return {
          ...defaultScreenOptions,
          headerTitle: () => <AppHeaderTitle />,
          headerLeft: () => {
            return isDrawerOpen ? (
              <HeaderLeftClose
                onCloseDrawer={() => onCloseDrawer(navigation)}
              />
            ) : (
              <HeaderLeftOpen onOpenDrawer={() => onOpenDrawer(navigation)} />
            );
          },
          headerRight: () => <HeaderRightButton />,
        };
      }}>
      <Main.Screen
        name="MainNavigator"
        listeners={{
          transitionStart: (e) => {
            console.log('transitionStart');
          },
          transitionEnd: (e) => {
            console.log('transition end');
          },
        }}
        component={DrawerNavigator}
      />
    </Main.Navigator>
  );
}

/* props: StackHeaderTitleProps */
/* props: StackHeaderLeftButtonProps */
/* initialRouteName={authenticated ? 'MainNavigator' : 'LoginNavigator'}> */
