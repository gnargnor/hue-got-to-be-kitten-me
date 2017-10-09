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
      bridgeRequestData: '',
      method: 'get',
      lastBridgeRequest: '',
      setIpInput: '',
      currentIp: 'No IP set',
      currentUser: 'No user exists',
      keyListener: 'Off',
      ipConfirmed: false
    }
    this.handleBridgeRequestInput = this.handleBridgeRequestInput.bind(this);
    this.sendBridgeRequest = this.sendBridgeRequest.bind(this);
    this.handleSetIpInput = this.handleSetIpInput.bind(this);
    this.setIp = this.setIp.bind(this);
    this.toggleKeyListener = this.toggleKeyListener.bind(this);
    this.keyListener = this.keyListener.bind(this);
    this.ipConfirmed = this.ipConfirmed.bind(this);
    this.changeRequestType = this.changeRequestType.bind(this);
  }

  handleBridgeRequestInput (e) {
    this.setState({
      bridgeRequestInput: e.target.value
    });
  }

  handleBridgeRequestDataInput (e) {
    this.setState({
      bridgeRequestData: e.target.value
    });
  }

  changeRequestType (e) {
    this.setState({
      method: e.target.value
    });
  }

  sendBridgeRequest () {
    let bridgeRequest = this.state.bridgeRequestInput;
    if (!this.state.ipConfirmed) {
      return;
    }
    this.setState({
        lastBridgeRequest: bridgeRequest,
        bridgeRequestInput: ''
    });
    request({
      method: this.state.method,
      url: '/bridge',
      data: {
        bridgeRequest,
        currentIp: this.state.currentIp,
        currentUser: this.state.currentUser,
        data: this.state.brType
      }
    });
  }

  handleSetIpInput (e) {
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
      url: '/setup/testIp',
      data: {
        newIp
      }
    })
    .then(response => {
      console.log(response);
      this.setState({
        ipConfirmed: response.data.confirmed,
        currentUser: response.data.username || this.state.currentUser
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  ipConfirmed () {
    if (this.state.ipConfirmed) {
      return '(confirmed)'
    }
    return '(unconfirmed)';
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
          <div className="set-ip-form">
            <p className={(this.state.ipConfirmed) ? 'green' : 'red'}>{this.ipConfirmed()}</p>
            <p>Current IP: {this.state.currentIp}</p>
            <p>Current User: {this.state.currentUser}</p>
            <span>Set IP:</span>
            <input type="text" className="input set-ip-input" value={this.state.setIpInput} onChange={this.handleSetIpInput}/>
            <button className="button set-ip-button" onClick={this.setIp}>Submit</button>
          </div>
          <hr />
          <div className="bridge-request-form">
            <h2>Bridge Request:</h2>
            <span>URL: </span>
            <input type="text" className="input bridge-request-input" value={this.state.bridgeRequestInput} onChange={this.handleBridgeRequestInput} />
            <p>Type: </p>
            <div className="requestTypeButtons" onChange={this.changeRequestType}>
              <input name="brType" className="brType" type="radio" value="get" defaultChecked={this.state.method === 'get'}/> Get 
              <input name="brType" className="brType" type="radio" value="post" defaultChecked={this.state.method === 'post'}/> Post 
              <input name="brType" className="brType" type="radio" value="put" defaultChecked={this.state.method === 'put'}/> Put 
              <input name="brType" className="brType" type="radio" value="delete" defaultChecked={this.state.method === 'delete'} /> Delete 
            </div>
            <p>Data: </p>
            <textarea className="bridge-request-data" value={this.state.bridegRequestData} onChange={this.handleBridgeRequestDataInput}></textarea>
            <button className="button bridge-request-button" onClick={this.sendBridgeRequest}>Send</button>
            <p>Last Bridge Request: {this.state.lastBridgeRequest}</p>
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