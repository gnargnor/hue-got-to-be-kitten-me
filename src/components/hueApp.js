'use strict';

import React from 'react';
import Header from './header/header';
import Main from './main/main';
import KeyListener from './key-listener/key-listener'
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