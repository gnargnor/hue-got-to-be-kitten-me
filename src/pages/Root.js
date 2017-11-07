'use strict';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HueApp from './HueApp';

import Header from '../components/Header';
import Main from './Main';

const Root = (props) => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default Root;
