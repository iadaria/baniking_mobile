import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen, LoginScreen, ResetPasswordScreen } from './screens';
import { BaseSettingsScreen } from '~/src/features/settings/screens';
// import RecoveryScreen from './screens/RecoveryScreen/RecoveryScreen';

//import ValidatedScreen from './screens/ValidatedScreen/ValidatedScreen';
//import TestValidatedScreen from './screens/TestValidatedScreen/TestValidatedScreen';

export default function AuthNavigator(): JSX.Element {
  const Auth = createStackNavigator();
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }} initialRouteName="RegisterScreen">
      {/* <Auth.Screen name="Screen" component={BaseSettingsScreen} /> */}
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Auth.Navigator>
  );
}

/* <Auth.Screen name="ValidatedScreen" component={ValidatedScreen} /> */
/* <Auth.Screen name="TestValidatedScreen" component={TestValidatedScreen} /> */
