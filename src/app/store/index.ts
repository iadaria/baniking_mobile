import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configuredReactotron } from '~/src/initial-imports/reactotron';
import rootReducer from './rootReducer';
import rootSagas from './rootSaga';

const { reduxNativeDevTools } = global;

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  reduxNativeDevTools != null ? reduxNativeDevTools({ name: 'baniking_mobile' }) : (nope) => nope,
  configuredReactotron != null ? configuredReactotron.createEnhancer() : (nope: any) => nope,
);

export const store = createStore(rootReducer, enhancer);

// export const persistor = persistStore(store);
export default store;
sagaMiddleware.run(rootSagas);
