'use strict';

import React from 'react';
import '../styles/header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div className="head-container">
          Hue Got To Be Kitten Me
        </div>
      </div>
    );
  }
}

export default Header;