import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from '@navigation/navigators/MainNavigator';
import { colors } from '@app/common/constants';
// import MainNavigator from 'navigation/navigators/MainNavigator';
// import { colors } from 'app/common/constants';
// import { colors } from 'app/common/constants';
// import AppFlashMessage from '../app/common/components/AppFlashMessage';
// import MainNavigator from './navigators/MainNavigator';
// import ModalManager from '../app/common/modals/ModalManager';
// import { defaultTheme } from './defaultThemes';
// import { navigationRef } from './helpers/RootNavigation';

//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <NavigationContainer /* theme={defaultTheme} ref={navigationRef} */>
        <MainNavigator />
      </NavigationContainer>

      {/* <ModalManager />
      <AppFlashMessage /> */}
    </SafeAreaProvider>
  );
}
