import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import { connect } from 'react-redux';
import { getCabinetData as getCabinetDataAction } from '~/src/features/profiles/store/profileActions';
import { IRootState } from '~/src/app/store/rootReducer';
import AuthNavigator from '~/src/features/auth/AuthNavigator';

interface IProps {
  authenticated: boolean;
  points: number;
  getCabinetData: () => void;
}

const Main = createStackNavigator();

function MainNavigatorContainer({ authenticated, getCabinetData }: IProps) {
  useEffect(() => {
    if (authenticated) {
      // logline('[MainNavigator/useEffect/(authenticated === true)/getCabinetData]');
      //getCabinetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  // authenticated = false;

  return (
    <Main.Navigator
      initialRouteName={authenticated ? 'DrawerNavigator' : 'AuthNavigator'}>
      <Main.Screen
        options={{ headerShown: false }}
        name="AuthNavigator"
        component={AuthNavigator}
      />
      <Main.Screen
        options={{ headerShown: false }}
        name="DrawerNavigator"
        component={DrawerNavigator}
      />
    </Main.Navigator>
  );
}

export default connect(
  ({ system, auth }: IRootState) => ({
    authenticated: auth.authenticated,
    points: system.header.points,
  }),
  {
    getCabinetData: getCabinetDataAction,
  },
)(MainNavigatorContainer);
