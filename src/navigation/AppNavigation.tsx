import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import store from '~/src/app/store';
import MainNavigator from '~/src/navigation/navigators/MainNavigator';
import ModalManager from '~/src/app/common/modals/ModalManager';
import Network from '~/src/app/common/components/Network';
import { checkAuth } from '~/src/features/auth/store/authActions';
import { navigationRef } from '~/src/navigation/helpers/RootNavigation';
import { appDefaultTheme } from './components/appDefaultTheme';
import { logline } from '../app/utils/debug';

//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {
  const initialize = async (): Promise<void> => {
    store.dispatch(checkAuth());
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer theme={appDefaultTheme} ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
      <ModalManager />
      <Network />
    </SafeAreaProvider>
  );
}
