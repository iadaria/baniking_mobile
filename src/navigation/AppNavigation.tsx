import React from 'react';
import { Provider } from 'react-redux';
import store from '~/src/app/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '~/src/navigation/navigators/MainNavigator';
import { navigationRef } from '~/src/navigation/helpers/RootNavigation';
import { appDefaultTheme } from './appDefaultTheme';

// import AppFlashMessage from '../app/common/components/AppFlashMessage';
// import MainNavigator from './navigators/MainNavigator';
// import ModalManager from '../app/common/modals/ModalManager';

//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <NavigationContainer theme={appDefaultTheme} ref={navigationRef}>
          <MainNavigator />
        </NavigationContainer>
        {/* <ModalManager />
        <AppFlashMessage /> */}
      </SafeAreaProvider>
    </Provider>
  );
}
