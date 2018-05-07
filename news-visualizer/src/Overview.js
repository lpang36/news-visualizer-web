import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';
import logo from './logo.svg';
import Connections from './Connections'
import * as d3 from 'd3';

class Overview extends Component {
  shouldComponentUpdate(nextProps,nextState) {
    return this.props.nodes.length==0&&this.props.edges.length==0
  }
  render() {
    if (this.props.nodes.length>0&&this.props.edges.length>0) {
      var max = 0
      this.props.nodes.forEach((n) => {
        max = Math.max(max,n.value)
      })
      return (
        <div className='Overview'>
          <div>
          {
            this.props.nodes.slice(0,5).map((n) => {
              return (
                <div key={n.text}>
                  <p><a href='#' onClick={() => {this.props.updateSelected({selected:'node',node:n.text})}}>{n.text}</a>: {n.value} articles</p>
                </div>
              )
            })
          }
          </div>
          <Connections edges={this.props.edges} updateSelected={this.props.updateSelected} limit={5}/>
          <WordCloud data={this.props.nodes} fontSizeMapper={(d) => {return (Math.log2(d.value)/Math.log2(max)*50)}} rotate={0} width={400} height={300}/>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }
}

export default Overview