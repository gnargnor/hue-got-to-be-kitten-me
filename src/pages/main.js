'use strict';

import React from 'react';
import '../styles/main.css';
import KeyListener from './key-listener';
import BridgeRequestForm from './bridge-request';
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
       // hardcode for now
      currentIp: '',
      ipErrorMessage: '',
      // hardcode for now
      currentUser: '',
      keyListener: 'Off',
      // set to true if hardcoding
      ipConfirmed: false
    }
  }

  componentDidMount () {
    console.log('the component mounted baby');
    let config = {
      method: 'get',
      url: 'https://www.meethue.com/api/nupnp',
    };
    request(config)
      .then(resp => {
        console.log(resp);
        console.log(typeof resp.data);
        console.log(resp.data[0].internalipaddress);
        if ( resp.data !== undefined && resp.data[0] !== undefined && resp.data[0].internalipaddress !== undefined ) {
          let newIp = resp.data[0].internalipaddress
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
                // ipConfirmed: response.data.confirmed,
                ipErrorMessage: response.data.message || '',
                currentUser: response.data.username || this.state.currentUser
              })
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('art');
        }
      })
      .catch(err => {
        console.log(err);
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
        // ipConfirmed: response.data.confirmed,
        currentUser: response.data.username || this.state.currentUser
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  ipConfirmed () {
    if (this.state.ipConfirmed) {
      return 'Confirmed'
    }
    return 'Unconfirmed';
  }

  ipErrorMessage () {
    switch (this.state.ipErrorMessage) {
      case 'TIGHT DAWG':
        return <span><b>Success: </b>{this.state.ipErrorMessage} **</span>;
      case '':
        return;
      default:
        return <span><b>** Error: </b>{this.state.ipErrorMessage} **</span>;
    }
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
            <h3 className={(this.state.ipConfirmed) ? 'green' : 'red'}>{::this.ipConfirmed()}</h3>
            {this.ipErrorMessage()}

            <h3>Current IP:</h3> 
            {this.state.currentIp}

            <h3>Current User:</h3>
            {this.state.currentUser}

            <h3>Set IP:</h3>
            <input type="text" className="input set-ip-input" value={this.state.setIpInput} onChange={::this.handleSetIpInput}/>
            <button className="button set-ip-button" onClick={::this.setIp}>Submit</button>
          </div>
          <hr />
          <BridgeRequestForm currentUser={this.state.ipConfirmed ? this.state.currentUser : '***confirm user***'} currentIp={(this.state.ipConfirmed ? this.state.currentIp : '***confirm ip***')} ipConfirmed={this.state.ipConfirmed}/>
          <hr />
          <div className="toggleKeyListener" onChange={::this.toggleKeyListener}>
            <p>Key Listener:</p>
            <input name="toggleKeyListener" type="radio" defaultChecked={this.state.keyListener === 'On'} /> On <br />
            <input name="toggleKeyListener" type="radio" defaultChecked={this.state.keyListener === 'Off'} /> Off <br />
            {::this.keyListener()}
          </div>
        </div>
      </div>
    )
  }
};

export default Main;