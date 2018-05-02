import React, { Component } from 'react';
import logo from './logo.svg';
import NodePanel from './NodePanel'
import EdgePanel from './EdgePanel'

class Panel extends Component {
  render() {
    if (this.props.selected==='node') {
      return (
        <div className='Panel' style={{width: '20%'}}>
          <NodePanel data={this.props.data} updateSelected={this.props.updateSelected}/>
        </div>
        );
    }
    else if (this.props.selected==='edge') {
      return (
        <div className='Panel' style={{width: '20%'}}>
          <EdgePanel data={this.props.data} updateSelected={this.props.updateSelected}/>
        </div>
        );
    }
    else {
      return (
        <div className='Panel' style={{width: '0px'}}></div>
        );
    }
  }
}

export default Panel