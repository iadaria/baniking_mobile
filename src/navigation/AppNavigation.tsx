import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '~/src/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '~/src/navigation/navigators/MainNavigator';
import { navigationRef } from '~/src/navigation/helpers/RootNavigation';
import AppFlashMessage from '~/src/app/common/components/AppFlashMessage/AppFlashMessage';
import { appDefaultTheme } from './components/appDefaultTheme';
// import { CHECK_AUTH } from '../features/auth/store/authConstants';
import { checkAuth } from '../features/auth/store/authActions';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
          <NavigationContainer theme={appDefaultTheme} ref={navigationRef}>
            <MainNavigator />
          </NavigationContainer>
          {/* <ModalManager /> */}
          <AppFlashMessage />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
