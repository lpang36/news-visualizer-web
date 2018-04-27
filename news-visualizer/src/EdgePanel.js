import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EdgeTitle from './EdgeTitle'
import Headlines from './Headlines'
import Time from './Time'

//to do: merge news api calls from headlines and time
class EdgePanel extends Component {
  render() {
    return (
      <div>
      <EdgeTitle data={this.props.data} />
      <Headlines data={[this.props.data.source,this.props.data.target]} />
      <Time data={[this.props.data.source,this.props.data.target]} />
      </div>
      );
  }
}

export default EdgePanel