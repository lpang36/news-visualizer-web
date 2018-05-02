import React, { Component } from 'react';
import logo from './logo.svg';
import $ from "jquery";
import Wiki from './Wiki'

class NodeTitle extends Component {
  render() {
    return (
      <div>
      <h1>{this.props.name}</h1>
      <p>{this.props.size} articles</p>
      <Wiki name={this.props.name}/>
      </div>
      );
  }
}

export default NodeTitle