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
import { defaultScreenOptions } from '../appDefaultTheme';
import {
  HeaderLeftClose,
  HeaderLeftOpen,
  HeaderRightButton,
} from '~/src/navigation/components/headerButtons';
import { ParamListBase, Route } from '@react-navigation/native';
import AppHeaderTitle from '../components/AppHeaderTitle';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer, closeDrawer } from '~/src/app/store/system/systemReducer';
import { IRootState } from '~/src/app/store/rootReducer';
import { ISystemState } from '~/src/app/store/system/systemReducer';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Main = createStackNavigator();

export default function MainNavigator() {
  const dispatch = useDispatch();
  // const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { isDrawerOpen } = useSelector<IRootState>(
    (state) => state.system,
  ) as ISystemState;

  function onOpenDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.openDrawer());
    dispatch(openDrawer());
    // setIsDrawerOpen(true);
  }

  function onCloseDrawer(navigation: StackNavigationProp<ParamListBase>) {
    navigation.dispatch(DrawerActions.closeDrawer());
    // setIsDrawerOpen(false);
    dispatch(closeDrawer());
  }

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
      <Main.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Main.Navigator>
  );
}

/* props: StackHeaderTitleProps */
/* props: StackHeaderLeftButtonProps */
/* initialRouteName={authenticated ? 'MainNavigator' : 'LoginNavigator'}> */
