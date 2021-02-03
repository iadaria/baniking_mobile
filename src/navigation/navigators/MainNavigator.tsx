import React from 'react';
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
  StackHeaderTitleProps,
} from '@react-navigation/stack';
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../app/store/rootReducer';
// import { IAuthState } from '../../features/auth/authReducer';
// import BottomNavigator from './BottomNavigator';
// import {
//   // defaultScreenOptions,
//   defaultTabScreenOptions,
// } from '../defaultThemes';
// import LoginNavigator from './LoginNavigator';
import DrawerNavigator from './DrawerNavigator';
import { defaultScreenOptions } from '../defaultTheme';
import { Text } from 'react-native';
import { Block } from '~/app/common/components/ui/Block';
import {
  HeaderLeftButton,
  HeaderRightButton,
} from '~/navigation/components/headerButtons';

export default function MainNavigator(): JSX.Element {
  // const { authenticated } = useSelector<IRootState>(
  //   (state) => state.auth,
  // ) as IAuthState;
  const authenticated = false;

  const Main = createStackNavigator();
  return (
    <Main.Navigator
      screenOptions={{
        ...defaultScreenOptions,
        headerTitle: (props: StackHeaderTitleProps) => (
          <Block debug>
            <Text {...props} style={{ color: 'white' }}>
              Test
            </Text>
          </Block>
        ),
        headerLeft: (props: StackHeaderLeftButtonProps) => (
          <HeaderLeftButton {...props} />
        ),
        headerRight: (props: StackHeaderLeftButtonProps) => (
          <HeaderRightButton {...props} />
        ),
      }}>
      {/* initialRouteName={authenticated ? 'MainNavigator' : 'LoginNavigator'}> */}
      {/* <Main.Screen
        options={{ headerShown: false }}
        // options={defaultScreenOptions}
        name="LoginNavigator"
        component={LoginNavigator}
      /> */}
      <Main.Screen
        // options={defaultTabScreenOptions}
        name="MainNavigator"
        component={DrawerNavigator}
      />
    </Main.Navigator>
  );
}
