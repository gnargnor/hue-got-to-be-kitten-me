'use strict';

import React from 'react';
import '../../styles/main.css';
import KeyListener from '../key-listener/key-listener';
import request from 'axios';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bridgeRequestInput: '',
      lastBridgeRequest: '',
      setIpInput: '',
      currentIp: 'No IP set',
      keyListener: 'Off'
    }
    this.handleBridgeRequestInput = this.handleBridgeRequestInput.bind(this);
    this.sendBridgeRequest = this.sendBridgeRequest.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSetIpInput = this.handleSetIpInput.bind(this);
    this.setIp = this.setIp.bind(this);
    this.toggleKeyListener = this.toggleKeyListener.bind(this);
    this.keyListener = this.keyListener.bind(this);
  }

  handleBridgeRequestInput (e) {
    console.log('BR e: ', e.target.value);
    this.setState({
      bridgeRequestInput: e.target.value
    });
  }

  sendBridgeRequest () {
    let bridgeRequest = this.state.bridgeRequestInput;
    this.setState({
        lastBridgeRequest: bridgeRequest,
        bridgeRequestInput: ''
    });
    request({
      method: 'post',
      url: '/bridge',
      data: {
        bridgeRequest
      }
    });
  }

  handleSetIpInput (e) {
    console.log('IP e: ', e.target.value);
    this.setState({
      setIpInput: e.target.value
    })
  }

  setIp () {
    let newIp = this.state.setIpInput;
    this.setState({
      currentIp: newIp,
      setIpInput: ''
    });
    request({
      method: 'post',
      url: '/bridge/setIp',
      data: {
        newIp
      }
    })
  }

  toggleKeyListener (e) {
    this.setState({
      keyListener: (this.state.keyListener === 'On') ? 'Off' : 'On'
    });
  }

  keyListener () {
    if (this.state.keyListener === 'On') {
      return <KeyListener /> 
    }
    return null;
  }
  
  

  render () {
    return (
      <div className="main">
        <div className="container">
          <div className="bridge-request-form">
            <span>Bridge Request:</span>
            <input type="text" className="input bridge-request-input" onChange={this.handleBridgeRequestInput}/>
            <button className="button bridge-request-button" onClick={this.sendBridgeRequest}>Send</button>
            <p>Last Bridge Request: {this.state.lastBridgeRequest}</p>
          </div>
          <hr />
          <div className="set-ip-form">
            <p>Current IP: {this.state.currentIp}</p>
            <span>Set IP:</span>
            <input type="text" className="input set-ip-input" onChange={this.handleSetIpInput}/>
            <button className="button set-ip-button" onClick={this.setIp}>Submit</button>
          </div>
          <hr />
          <div className="toggleKeyListener" onChange={this.toggleKeyListener}>
            <p>Key Listener:</p>
            <input name="toggleKeyListener" type="radio" defaultChecked={this.state.keyListener === 'On'} /> On <br />
            <input name="toggleKeyListener" type="radio" defaultChecked={this.state.keyListener === 'Off'} /> Off <br />
            {this.keyListener()}
          </div>

        </div>
      </div>
    )
  }
};

export default Main;