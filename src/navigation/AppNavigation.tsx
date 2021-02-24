import React, { useEffect } from 'react';
import store from '~/src/app/store';
import { checkAuth } from '~/src/features/auth/store/authActions';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '~/src/navigation/navigators/MainNavigator';
import { navigationRef } from '~/src/navigation/helpers/RootNavigation';
import AppFlashMessage from '~/src/app/common/components/AppFlashMessage/AppFlashMessage';
import { appDefaultTheme } from './components/appDefaultTheme';
// import ModalManager from '../app/common/modals/ModalManager';

//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {
  const initialize = async (): Promise<void> => {
    // const { language } = await store.getState().persist;
    // await i18next.init TOOD
    // store.dispatch({ type: CHECK_AUTH });
    store.dispatch(checkAuth());
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <NavigationContainer theme={appDefaultTheme} ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
      {/* <ModalManager /> */}
      <AppFlashMessage />
    </SafeAreaProvider>
  );
}
