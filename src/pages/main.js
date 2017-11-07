'use strict';

import React from 'react';
import '../styles/main.css';
import KeyListener from './KeyListener';
import BridgeRequest from './BridgeRequest';
import { Route } from 'react-router-dom';
import Home from './Home';
import SetIp from './SetIp';
import request from 'axios';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bridgeRequestInput: '',
      bridgeRequestData: '',
      method: 'get',
      lastBridgeRequest: '',

      currentUser: '',
      keyListener: 'Off',

    }
  }

  componentDidMount () {
    // makes a request to find a bridge on the local network
    let config = {
      method: 'get',
      url: 'https://www.meethue.com/api/nupnp',
    };
    request(config)
      .then(resp => {
        // it would be nice to toggle a modal that prompts pressing the link button on the bridge
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
          <div className="toggleKeyListener" onChange={::this.toggleKeyListener}>
            <label>Key Listener:</label>
            <input name="toggleKeyListener" type="radio" defaultChecked={this.state.keyListener === 'On'} /> On
            <input name="toggleKeyListener" type="radio" defaultChecked={this.state.keyListener === 'Off'} /> Off
            {::this.keyListener()}
          </div>
          <hr />
          <div>
            <ul>
              <li><a href='/SetIp'>Set Ip</a></li>
              <li><a href='/BridgeRequest'>Bridge Request</a></li>
            </ul>
          </div>
          <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/SetIp' component={SetIp} />
            <Route exact path='/BridgeRequest' component={BridgeRequest} />
          </div>
        </div>
      </div>
    )
  }
};

export default Main;
