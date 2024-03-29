import React from 'react';
import '~/src/initial-imports';
import AppNavigation from './src/navigation/AppNavigation';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store, persistor } from '~/src/app/store';
import { PersistGate } from 'redux-persist/integration/react';
// import codePush from 'react-native-code-push';

enableScreens(true);

const App: () => React.ReactElement = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

/* const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
}; */

// export default codePush(codePushOptions)(App);
