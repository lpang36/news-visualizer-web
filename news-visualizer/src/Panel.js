import React, { Component } from 'react';
import logo from './logo.svg';
import NodePanel from './NodePanel'
import EdgePanel from './EdgePanel'

class Panel extends Component {
  constructor() {
    super()
    this.state = {
      index: 0
    }
  }
  updateIndex = (ind) => {
    this.setState({index: ind})
  }
  render() {
    if (this.props.selected==='node') {
      return (
        <div className='Panel' style={{width: '400px'}}>
          <NodePanel data={this.props.data} updateSelected={this.props.updateSelected} updateIndex={this.updateIndex} index={this.state.index}/>
        </div>
        );
    }
    else if (this.props.selected==='edge') {
      return (
        <div className='Panel' style={{width: '400px'}}>
          <EdgePanel data={this.props.data} updateSelected={this.props.updateSelected} updateIndex={this.updateIndex} index={this.state.index}/>
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