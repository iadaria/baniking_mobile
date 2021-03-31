import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

import { ParamListBase, Route } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
  openDrawer as openDrawerAction,
  closeDrawer as closeDrawerAction,
  pullBackward as pullBackwardAction,
} from '~/src/app/store/system/systemActions';
import { getCabinetData as getCabinetDataAction } from '~/src/features/profiles/store/profileActions';
import { IRootState } from '~/src/app/store/rootReducer';
import AuthNavigator from '~/src/features/auth/AuthNavigator';
// import { UnauthScreen } from '~/src/features/auth/screens';
import { appScreenOptions } from '../components/appScreenOptions';

interface IProps {
  isDrawerOpen: boolean;
  isBackward: boolean;
  authenticated: boolean;
  backwardStack: string[];
  points: number;
  // currentScreen?: string;
  isTransparent: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  pullBackward: () => void;
  getCabinetData: () => void;
}

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Main = createStackNavigator();

function MainNavigatorContainer({
  authenticated,
  isDrawerOpen,
  isBackward,
  backwardStack,
  points,
  isTransparent,
  openDrawer,
  closeDrawer,
  pullBackward,
  getCabinetData,
}: IProps) {
  useEffect(() => {
    if (authenticated) {
      // console.log('[MainNavigator/useEffect/(authenticated === true)/getCabinetData]');
      getCabinetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  function onOpenDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.openDrawer());
    openDrawer();
  }

  function onCloseDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.closeDrawer());
    closeDrawer();
  }

  // authenticated = false;

  return (
    <Main.Navigator initialRouteName={authenticated ? 'DrawerNavigator' : 'AuthNavigator'}>
      <Main.Screen options={{ headerShown: false }} name="AuthNavigator" component={AuthNavigator} />
      <Main.Screen
        options={({ navigation, route }: IScreenOptionsProps) => {
          return appScreenOptions({
            isDrawerOpen,
            isBackward,
            backwardStack,
            points,
            navigation,
            route,
            isTransparent,
            onCloseDrawer,
            onOpenDrawer,
            pullBackward,
          });
        }}
        name="DrawerNavigator"
        component={DrawerNavigator}
      />
    </Main.Navigator>
  );
}

export default connect(
  ({ system, auth }: IRootState) => ({
    authenticated: auth.authenticated,
    isDrawerOpen: system.header.isDrawerOpen,
    isBackward: system.header.isBackward,
    backwardStack: system.header.backwardStack,
    points: system.header.points,
    // currentScreen: system.header.currentScreen,
    isTransparent: system.header.isTransparent,
  }),
  {
    openDrawer: openDrawerAction,
    closeDrawer: closeDrawerAction,
    pullBackward: pullBackwardAction,
    getCabinetData: getCabinetDataAction,
  },
)(MainNavigatorContainer);

// export { MainNavigatorConnected as MainNavigator };

/* props: StackHeaderTitleProps */
/* props: StackHeaderLeftButtonProps */
/* initialRouteName={authenticated ? 'MainNavigator' : 'LoginNavigator'}> */

/* screenOptions={({ navigation }: IScreenOptionsProps) =>
      /*  return {
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
      }}> */
/* console.log('[MainNavigator/useEffect(autenticated === true)] getCabinetData');
      timerId = setTimeout(function () {
        console.log('[MainNavigator/useEffect/setInterval] getCabinetData');
        getCabinetData();
      }, 1000);
    }
    return function () {
      if (timerId) {
        clearTimeout(timerId);
      }
    };*/
