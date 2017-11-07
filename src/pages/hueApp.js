'use strict';

import React from 'react';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from '../reducers/index';
import Root from './Root';
import '../styles/hue-app.css';

const store = createStore(reducers);

const HueApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>
  );
};

export default HueApp;