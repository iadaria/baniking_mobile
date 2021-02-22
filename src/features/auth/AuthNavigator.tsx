import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen, LoginScreen, RecoveryScreen } from './screens';
// import RecoveryScreen from './screens/RecoveryScreen/RecoveryScreen';

//import ValidatedScreen from './screens/ValidatedScreen/ValidatedScreen';
//import TestValidatedScreen from './screens/TestValidatedScreen/TestValidatedScreen';

export default function AuthNavigator(): JSX.Element {
  const Auth = createStackNavigator();
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }} initialRouteName="RegisterScreen">
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen name="RecoveryScreen" component={RecoveryScreen} />
    </Auth.Navigator>
  );
}

/* <Auth.Screen name="ValidatedScreen" component={ValidatedScreen} /> */
/* <Auth.Screen name="TestValidatedScreen" component={TestValidatedScreen} /> */
