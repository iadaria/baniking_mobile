import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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

export default function MainNavigator(): JSX.Element {
  // const { authenticated } = useSelector<IRootState>(
  //   (state) => state.auth,
  // ) as IAuthState;
  const authenticated = false;

  const Main = createStackNavigator();
  return (
    <Main.Navigator
    // initialRouteName={authenticated ? 'MainNavigator' : 'LoginNavigator'}>
    >
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
