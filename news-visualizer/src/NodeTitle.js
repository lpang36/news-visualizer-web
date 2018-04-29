import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class NodeTitle extends Component {
  render() {
    return (
      <div>
      <h1>{this.props.name}</h1>
      <p>{this.props.size} articles</p>
      </div>
      );
  }
}

export default NodeTitle