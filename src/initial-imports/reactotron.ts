import AsyncStorage from '@react-native-community/async-storage';

let reactotron;
if (__DEV__) {
  const Reactotron = require('reactotron-react-native').default;
  const {
    trackGlobalErrors,
    openInEditor,
    networking,
  } = require('reactotron-react-native');
  const { reactotronRedux } = require('reactotron-redux');
  const sagaPlugin = require('reactotron-redux-saga');
  reactotron = Reactotron.configure({
    host: '192.168.1.82',
  })
    // .useReactNative({ overlay: false })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .use(trackGlobalErrors())
    .use(reactotronRedux())
    .use(networking())
    .use(sagaPlugin())
    .use(openInEditor())
    .connect();
  global.Reactotron = Reactotron;
} else {
  global.Reactotron = {
    log: () => {},
    logImportant: () => {},
    warn: () => {},
    error: () => {},
  };
}

export const configuredReactotron = reactotron;
