import {View, Text} from 'react-native';
import React from 'react';
import RootComponent from './src/components/RootComponent';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};

export default App;
