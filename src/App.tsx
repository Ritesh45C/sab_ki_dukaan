import React from 'react'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import RootScreen from './containers/Root/RootScreen';
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';
import configureStore from './redux/store/configureStore';
import SplashScreen from './containers/SplashScreen/SplashScreen';
import {StatusBar} from 'react-native'

const {store, persistor} = configureStore(rootReducer, rootSaga);




  const App = () => (
    <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
         <RootScreen />
        </PersistGate>
    </Provider>
  );
  
  export default App;