import React from 'react';
import '~/src/initial-imports';
import AppNavigation from './src/navigation/AppNavigation';
import { enableScreens } from 'react-native-screens';

enableScreens();

const App: () => React.ReactElement = () => {
  return <AppNavigation />;
};

export default App;
