import React from 'react';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);
  
  

export default App;
