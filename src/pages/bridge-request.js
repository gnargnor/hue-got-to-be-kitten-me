'use strict';

import React from 'react';
import request from 'axios';
import '../styles/bridge-request.css';

class BridgeRequestForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      method: 'get',
      routeInput: '',
      URL: '',
      bridgeRequestData: '',
      lastBridgeRequest: []
    }

    // this.handleRouteInput = this.handleRouteInput.bind(this);
    // this.changeRequestType = this.changeRequestType.bind(this);
    // this.handleBridgeRequestDataInput = this.handleBridgeRequestDataInput.bind(this);
    // this.sendBridgeRequest = this.sendBridgeRequest.bind(this);
  }

  componentWillMount () {
    this.setState({
      URL: `http://${this.props.currentIp}/api/${this.props.currentUser}`
    })
  }

  handleRouteInput (e) {
    this.setState({
      routeInput: e.target.value
    });
  }

  changeRequestType (e) {
    this.setState({
      method: e.target.value
    });
  }

  handleBridgeRequestDataInput (e) {
    this.setState({
      bridgeRequestData: e.target.value
    });
  }

  sendBridgeRequest () {
    let bridgeRequest = {
      url: `${this.state.URL}/${this.state.routeInput}`,
      method: this.state.method,
      data: this.state.bridgeRequestData
    }
    console.log('bridge request: ', bridgeRequest);
    this.setState({
        lastBridgeRequest: bridgeRequest,
        routeInput: ''
    });
    console.log(this.props.currentIp, this.props.currentUser);
    request({
      method: 'post',
      url: '/bridge/',
      data: {
        bridgeRequest,
        currentIp: this.props.currentIp,
        currentUser: this.props.currentUser,
        data: bridgeRequest
      }
    });
  }

  determineURL () {
    return <span>{this.state.URL}</span>;
  }

  render () {
    return (
      <div className="bridge-request-form">

        <div className='currentBridgeRequest'>
          <h2>Bridge Request:</h2>
            
            <h3>URL:</h3>
            <code>{this.determineURL()}/</code>
            <input 
              type="text"
              className="input bridge-request-input"
              value={this.state.routeInput}
              onChange={::this.handleRouteInput} />
          
            <h3>Method:</h3>
            <div className="requestTypeButtons" onChange={::this.changeRequestType}>
              <input name="brType" className="brType" type="radio" value="get" defaultChecked={this.state.method === 'get'}/> Get 
              <input name="brType" className="brType" type="radio" value="post" defaultChecked={this.state.method === 'post'}/> Post 
              <input name="brType" className="brType" type="radio" value="put" defaultChecked={this.state.method === 'put'}/> Put 
              <input name="brType" className="brType" type="radio" value="delete" defaultChecked={this.state.method === 'delete'} /> Delete 
            </div>

            <h3>Data:</h3>
            <textarea className="bridge-request-data" value={this.state.bridegRequestData} onChange={::this.handleBridgeRequestDataInput} /><br />
            <button className="button bridge-request-button" onClick={::this.sendBridgeRequest}>Send</button>
        </div>
        
        <br /><hr />
        <div className="last-bridge-request">
          <h2>Last Bridge Request:</h2>

            <h3>URL:</h3>
            {this.state.lastBridgeRequest.url}

            <h3>Method:</h3>
            {this.state.lastBridgeRequest.method}

            <h3>Response:</h3>
            {this.state.lastBridgeRequest.data}
        </div>
        <br />
        
      </div>
    );
  }
}

export default BridgeRequestForm;