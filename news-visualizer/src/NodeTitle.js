import React, { Component } from 'react';
import logo from './logo.svg';
import $ from "jquery";
import Wiki from './Wiki'

class NodeTitle extends Component {
  render() {
    return (
      <div>
      <h2>{this.props.name}</h2>
      <p>{this.props.size} articles</p>
      <Wiki name={this.props.name}/>
      </div>
      );
  }
}

export default NodeTitle