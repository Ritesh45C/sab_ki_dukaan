import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
//import immutableTransform from 'redux-persist-transform-immutable';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';

/**
 * Nao utilizar AsyncStorage para armazenar informacoes sensiveis, privadas
 *
 * TODO: implementar redux-persist-sensitive-storage
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

const persistConfig = {
 /* transforms: [

    immutableTransform(),
  ],*/
  key: 'root',
  storage: AsyncStorage,
  /**
   * Blacklist state - definir  o que nao deve ser salvo na AsyncStorage
   */
  blacklist: [
    // 'exchange', // informar o nome do reducer da store
  ],
};

export default function configureStore(rootReducer: any, rootSaga: any) {
  // define middlewares a serem usados
  const middleware = [];

  // definie enhancers a serem usados
  const enhancers = [];

  // Conectar sagas a redux store
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  // Inicia redux sagas watchers
  sagaMiddleware.run(rootSaga);
  // 	// .done.catch((e) => {
  // 	//   console.log('SAGA' , e.message)
  // 	// });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/', () => {
      const nextReducer = require('../reducers/').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return {store, persistor};
}
