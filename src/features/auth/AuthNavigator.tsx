import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen, LoginScreen } from './screens';

export default function AuthNavigator(): JSX.Element {
  const Auth = createStackNavigator();
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
    </Auth.Navigator>
  );
}
