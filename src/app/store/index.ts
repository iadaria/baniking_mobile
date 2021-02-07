import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configuredReactotron } from '~/initial/reactotron';
// import {
//   persistStore,
//   // persistReducer,
// } from 'redux-persist';
import rootReducer from './rootReducer';
import rootSagas from './rootSaga';
// import AsyncStorage from '@react-native-community/async-storage';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: [],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const { reduxNativeDevTools } = global;

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  reduxNativeDevTools != null
    ? reduxNativeDevTools({ name: 'baniking_mobile' })
    : (nope) => nope,
  configuredReactotron != null
    ? configuredReactotron.createEnhancer()
    : (nope: any) => nope,
);

export const store = createStore(rootReducer, enhancer);

// export const persistor = persistStore(store);
export default store;
sagaMiddleware.run(rootSagas);
