import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  /* RegisterScreen,
  ResetPasswordScreen,
  VerifyScreen,
  RegisterCompleteScreen, */
} from './screens';

export default function AuthNavigator(): JSX.Element {
  const Auth = createStackNavigator();
  return (
    <Auth.Navigator
      //initialRouteName="ResetPasswordScreen"
      //initialRouteName="LoginScreen"
      //initialRouteName="VerifyScreen"
      initialRouteName="LoginScreen"
      //initialRouteName="RegisterCompleteScreen"
      //initialRouteName="RegisterScreen"
      screenOptions={{ headerShown: false }}>
      {/* <Auth.Screen name="Screen" component={BaseSettingsScreen} /> */}
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      {/* <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen
        name="RegisterCompleteScreen"
        component={RegisterCompleteScreen}
      />
      <Auth.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Auth.Screen name="VerifyScreen" component={VerifyScreen} /> */}
    </Auth.Navigator>
  );
}
