import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

import { ParamListBase, Route } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
  openDrawer as openDrawerAction,
  closeDrawer as closeDrawerAction,
} from '~/src/app/store/system/systemReducer';
import { IRootState } from '~/src/app/store/rootReducer';
import AuthNavigator from '~/src/features/auth/AuthNavigator';
// import { UnauthScreen } from '~/src/features/auth/screens';
import { appScreenOptions } from '../components/appScreenOptions';
import store from '~/src/app/store';
import { checkAuth } from '~/src/features/auth/store/authActions';

interface IProps {
  isDrawerOpen: boolean;
  isBackward: boolean;
  authenticated: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

interface IScreenOptionsProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Main = createStackNavigator();

function MainNavigatorContainer({ authenticated, isDrawerOpen, isBackward, openDrawer, closeDrawer }: IProps) {
  const initialize = async (): Promise<void> => {
    // const { language } = await store.getState().persist;
    // await i18next.init TOOD
    // store.dispatch({ type: CHECK_AUTH });
    store.dispatch(checkAuth());
  };

  useEffect(() => {
    initialize();
  }, []);

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
      {/* <Main.Navigator initialRouteName={authenticated ? 'DrawerNavigator' : 'LoginScreen'}> */}
      {/* <Main.Screen options={{ headerShown: true }} name="ProfileScreen" component={LoginScreen} /> */}
      <Main.Screen options={{ headerShown: false }} name="AuthNavigator" component={AuthNavigator} />
      <Main.Screen
        options={({ navigation, route }: IScreenOptionsProps) => {
          return appScreenOptions({
            isDrawerOpen,
            isBackward,
            navigation,
            route,
            onCloseDrawer,
            onOpenDrawer,
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
  }),
  {
    openDrawer: openDrawerAction,
    closeDrawer: closeDrawerAction,
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
