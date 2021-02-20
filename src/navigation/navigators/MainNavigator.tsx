import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions, getFocusedRouteNameFromRoute, useNavigationState } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import { defaultScreenOptions } from '../appDefaultTheme';
import {
  HeaderLeftClose,
  HeaderLeftOpen,
  HeaderRightButton,
  HeaderBackward,
} from '~/src/navigation/components/headerButtons';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { ParamListBase, Route } from '@react-navigation/native';
import AppHeaderTitle from '../components/AppHeaderTitle';
import { connect } from 'react-redux';
import {
  openDrawer as openDrawerAction,
  closeDrawer as closeDrawerAction,
} from '~/src/app/store/system/systemReducer';
import { IRootState } from '~/src/app/store/rootReducer';
import AuthNavigator from '~/src/features/auth/AuthNavigator';
import { UnauthScreen } from '~/src/features/auth/screens';

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

interface IAppScreenOptionsProps {
  isDrawerOpen: boolean;
  isBackward: boolean;
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string, object | undefined>;
  onCloseDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
  onOpenDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
}

const Main = createStackNavigator();

const appScreenOptions = ({
  isDrawerOpen,
  isBackward,
  navigation,
  route,
  onCloseDrawer,
  onOpenDrawer,
}: IAppScreenOptionsProps) => {
  return {
    ...defaultScreenOptions,
    headerTitle: () => <AppHeaderTitle />,
    headerLeft: () => {
      // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
      // console.log('[MainNavigator] ** canBack', navigation.canGoBack());
      // console.log('[MainNavigator] ** screen', RootNavigation.getCurrentRoute() );

      if (isBackward) {
        return <HeaderBackward navigation={navigation} />;
      }

      return isDrawerOpen ? (
        <HeaderLeftClose onCloseDrawer={() => onCloseDrawer(navigation)} />
      ) : (
        <HeaderLeftOpen onOpenDrawer={() => onOpenDrawer(navigation)} />
      );
    },
    headerRight: () => <HeaderRightButton />,
  };
};

function MainNavigatorContainer({ authenticated, isDrawerOpen, isBackward, openDrawer, closeDrawer }: IProps) {
  /* const { isDrawerOpen } = useSelector<IRootState>((state) => state.system) as ISystemState; */

  function onOpenDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.openDrawer());
    openDrawer();
  }

  function onCloseDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.closeDrawer());
    closeDrawer();
  }

  authenticated = true;

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
        component={authenticated ? DrawerNavigator : UnauthScreen}
      />
    </Main.Navigator>
  );
}

//const MainNavigatorConnected = connect(
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
