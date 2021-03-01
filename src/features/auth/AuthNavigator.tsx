import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen, LoginScreen, ResetPasswordScreen } from './screens';

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
