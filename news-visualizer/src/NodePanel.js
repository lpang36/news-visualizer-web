import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NodeTitle from './NodeTitle'
import Connections from './Connections'
import Headlines from './Headlines'
import Time from './Time'

//to do: merge news api calls from headlines and time
class NodePanel extends Component {
  render() {
    return (
      <div>
      <NodeTitle data={this.props.data.name} />
      <Connections data={this.props.data} />
      <Headlines data={[this.props.data.name]} />
      <Time data={[this.props.data.name]} />
      </div>
      );
  }
}

export default NodePanel