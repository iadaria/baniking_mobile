import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import { defaultScreenOptions } from '../appDefaultTheme';
import { HeaderLeftClose, HeaderLeftOpen, HeaderRightButton } from '~/src/navigation/components/headerButtons';
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
  navigation: StackNavigationProp<ParamListBase>;
  onCloseDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
  onOpenDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
}

const Main = createStackNavigator();

const appScreenOptions = ({ isDrawerOpen, navigation, onCloseDrawer, onOpenDrawer }: IAppScreenOptionsProps) => {
  return {
    ...defaultScreenOptions,
    headerTitle: () => <AppHeaderTitle />,
    headerLeft: () => {
      return isDrawerOpen ? (
        <HeaderLeftClose onCloseDrawer={() => onCloseDrawer(navigation)} />
      ) : (
        <HeaderLeftOpen onOpenDrawer={() => onOpenDrawer(navigation)} />
      );
    },
    headerRight: () => <HeaderRightButton />,
  };
};

function MainNavigatorContainer({ authenticated, isDrawerOpen, openDrawer, closeDrawer }: IProps) {
  /* const { isDrawerOpen } = useSelector<IRootState>((state) => state.system) as ISystemState; */

  function onOpenDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.openDrawer());
    openDrawer();
  }

  function onCloseDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.closeDrawer());
    closeDrawer();
  }

  return (
    <Main.Navigator initialRouteName={authenticated ? 'DrawerNavigator' : 'AuthNavigator'}>
      {/* <Main.Navigator initialRouteName={authenticated ? 'DrawerNavigator' : 'LoginScreen'}> */}
      {/* <Main.Screen options={{ headerShown: true }} name="ProfileScreen" component={LoginScreen} /> */}
      <Main.Screen options={{ headerShown: false }} name="AuthNavigator" component={AuthNavigator} />
      <Main.Screen
        options={({ navigation }: IScreenOptionsProps) =>
          appScreenOptions({
            isDrawerOpen,
            navigation,
            onCloseDrawer,
            onOpenDrawer,
          })
        }
        name="DrawerNavigator"
        component={authenticated ? DrawerNavigator : UnauthScreen}
      />
    </Main.Navigator>
  );
}

//const MainNavigatorConnected = connect(
export default connect(
  (state: IRootState) => ({
    isDrawerOpen: state.system.isDrawerOpen,
    authenticated: state.auth.authenticated,
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
