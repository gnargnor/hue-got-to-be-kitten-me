'use strict';

import React from 'react';
import '../styles/key-listener.css';

import io from 'socket.io-client';
const socket = io();

class KeyListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyLog: []
    }
    // TODO: Determine why the double colon self binding syntax doesn't work for this.handleKeypress
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount () {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress (e) {
    this.setState({
      keyLog: [...this.state.keyLog, e.key]
    });
    socket.emit('key press', e.key);
  }

  logKeys () {
    return this.state.keyLog.map((pressedKey, index) => {
      return (
        <span style={{marginRight: '4px'}} key={`key-LOL${index}`}>{pressedKey}</span>
      );
    })
  }

  render () {
    return (
      <div className="key-listener">
        ( -- Key Listener On -- )
        <div className="key-log">
          {::this.logKeys()}
        </div>
      </div>
    )
  }
}

export default KeyListener;
