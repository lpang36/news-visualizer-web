import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NodePanel from './NodePanel'
import EdgePanel from './EdgePanel'

class Panel extends Component {
  render() {
    if (this.props.selected==='node') {
      return (
        <div className='Panel'>
          <NodePanel data={this.props.data} />
        </div>
        );
    }
    else if (this.props.selected==='edge') {
      return (
        <div className='Panel'>
          <EdgePanel data={this.props.data} />
        </div>
        );
    }
    else {
      return (
        <div className='Panel'></div>
        );
    }
  }
}

export default Panel