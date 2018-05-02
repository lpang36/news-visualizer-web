import React, { Component } from 'react';
import logo from './logo.svg';
import EdgeTitle from './EdgeTitle'
import Headlines from './Headlines'
import Time from './Time'

//to do: merge news api calls from headlines and time
class EdgePanel extends Component {
  render() {
    return (
      <div>
      <EdgeTitle data={this.props.data} updateSelected={this.props.updateSelected}/>
      <Headlines data={this.props.data.articles}/>
      <Time data={this.props.data.articles}/>
      </div>
      );
  }
}

export default EdgePanel