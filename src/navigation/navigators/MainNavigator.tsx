import React, { useState } from 'react';
import {
  createStackNavigator,
  StackHeaderTitleProps,
  StackNavigationProp,
} from '@react-navigation/stack';
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../app/store/rootReducer';
// import { IAuthState } from '../../features/auth/authReducer';
// import BottomNavigator from './BottomNavigator';
// import {
//   // defaultScreenOptions,
//   defaultTabScreenOptions,
// } from '../defaultThemes';
import { DrawerActions } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import { defaultScreenOptions } from '../defaultTheme';
import { Text } from 'react-native';
import { Block } from '~/app/common/components/ui/Block';
import {
  HeaderLeftClose,
  HeaderLeftOpen,
  HeaderRightButton,
} from '~/navigation/components/headerButtons';
import { ParamListBase, Route } from '@react-navigation/native';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export default function MainNavigator(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  // const { authenticated } = useSelector<IRootState>(
  //   (state) => state.auth,
  // ) as IAuthState;
  const authenticated = false;

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
          headerTitle: (props: StackHeaderTitleProps) => (
            <Block debug>
              <Text {...props} style={{ color: 'white' }}>
                Test
              </Text>
            </Block>
          ),
          headerLeft: (/* props: StackHeaderLeftButtonProps */) =>
            isDrawerOpen ? (
              <HeaderLeftClose
                onCloseDrawer={() => onCloseDrawer(navigation)}
              />
            ) : (
              <HeaderLeftOpen onOpenDrawer={() => onOpenDrawer(navigation)} />
            ),
          headerRight: () => <HeaderRightButton />,
        };
      }}>
      {/* initialRouteName={authenticated ? 'MainNavigator' : 'LoginNavigator'}> */}
      <Main.Screen name="MainNavigator" component={DrawerNavigator} />
    </Main.Navigator>
  );
}
