'use strict';

import React from 'react';

class SetIp extends React.Component {
  constructor(){
    super();
    this.state = {
      // hardcode for now
      currentIp: '',
      // hardcode for now
      currentUser: '',
      // set to true if hardcoding
      ipConfirmed: false,
      ipErrorMessage: '',
      setIpInput: ''
    }
  }

  // might be nice to bring in a form component for inputs
  handleSetIpInput (e) {
    this.setState({
      setIpInput: e.target.value
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

  render () {
    return (
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
  );
}
};

export default SetIp;
