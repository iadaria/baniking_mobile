import React from 'react';
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
  openDrawer: () => void;
  closeDrawer: () => void;
  pullBackward: () => void;
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
  openDrawer,
  closeDrawer,
  pullBackward,
}: IProps) {
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
    isDrawerOpen: system.header.isDrawerOpen,
    isBackward: system.header.isBackward,
    authenticated: auth.authenticated,
    backwardStack: system.header.backwardStack,
    points: system.header.points,
  }),
  {
    openDrawer: openDrawerAction,
    closeDrawer: closeDrawerAction,
    pullBackward: pullBackwardAction,
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
