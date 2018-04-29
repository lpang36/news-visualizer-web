import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class EdgeTitle extends Component {
  render() {
    return (
      <div>
        <h1><a href='#' onClick={() => {this.props.updateSelected({selected:'node',node:this.props.data.source})}}>{this.props.data.source}</a> ↔ <a href='#' onClick={() => {this.props.updateSelected({selected:'node',node:this.props.data.target})}}>{this.props.data.target}</a></h1>
        <p>{this.props.data.value} articles</p>
      </div>
      );
  }
}

export default EdgeTitle