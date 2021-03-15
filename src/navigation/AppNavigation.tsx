import React, { useEffect } from 'react';
import store from '~/src/app/store';
import { checkAuth } from '~/src/features/auth/store/authActions';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '~/src/navigation/navigators/MainNavigator';
import { navigationRef } from '~/src/navigation/helpers/RootNavigation';
import { appDefaultTheme } from './components/appDefaultTheme';
import ModalManager from '~/src/app/common/modals/ModalManager';
// import i18next from 'i18next';
// import { initLanguage } from '../i18n';
import { showAlert } from '../app/common/components/showAlert';


//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {
  const initialize = async (): Promise<void> => {
    // await initLanguage();
    store.dispatch(checkAuth());
  };

  useEffect(() => {
    const ver = `V8 version is ${global._v8runtime().version}`;
    showAlert('title', ver);
    initialize();
    // return () => i18next.off('languageChanged');
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <NavigationContainer theme={appDefaultTheme} ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
      <ModalManager /> 
    </SafeAreaProvider>
  );
}
