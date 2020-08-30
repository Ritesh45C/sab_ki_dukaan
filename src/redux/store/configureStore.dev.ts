import {applyMiddleware, compose, createStore} from 'redux';
import logger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
//import immutableTransform from 'redux-persist-transform-immutable';

import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';

// define Redux Dev Tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Nao utilizar AsyncStorage para armazenar informacoes sensiveis, privadas
 *
 * TODO: implementar redux-persist-sensitive-storage
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

const persistConfig = {
/*  transforms: [
   
    immutableTransform(),
  ],*/
  key: 'root',
  storage: AsyncStorage,
  /**
   * Blacklist state - definir  o que nao deve ser salvo na AsyncStorage
   */
  blacklist: [
  ],
};

export default function configureStore(rootReducer: any, rootSaga: any) {
  // define middlewares a serem usados
  const middleware = [logger];

  // definie enhancers a serem usados
  const enhancers = [];

  // Conectar sagas a redux store
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // enhancers.push(composeEnhancers(applyMiddleware(...middleware)));

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  const persistor = persistStore(store);

  // Inicia redux sagas watchers
  sagaMiddleware.run(rootSaga);
  // .done.catch((e) => {
  //   console.log('SAGA' , e.message)
  // });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return {store, persistor};
}
