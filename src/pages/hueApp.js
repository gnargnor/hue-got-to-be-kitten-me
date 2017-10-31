'use strict';

import React from 'react';
import Header from '../components/header';
import Main from './main';
import '../styles/hue-app.css';

class HueApp extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default HueApp;