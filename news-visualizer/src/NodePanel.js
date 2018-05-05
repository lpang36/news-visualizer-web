import React, { Component } from 'react';
import logo from './logo.svg';
import NodeTitle from './NodeTitle'
import Connections from './Connections'
import Headlines from './Headlines'
import Time from './Time'

//to do: merge news api calls from headlines and time
class NodePanel extends Component {
  render() {
    return (
      <div>
      <NodeTitle name={this.props.data.name} size={this.props.data.size}/>
      <Connections name={this.props.data.name} edges={this.props.data.edges} updateSelected={this.props.updateSelected}/>
      <Time data={this.props.data.articles} updateIndex = {this.props.updateIndex}/>
      <Headlines data={this.props.data.articles} index = {this.props.index}/>
      </div>
      );
  }
}

export default NodePanel