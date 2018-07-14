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
          <h2>top topics</h2>
          <div>
          {
            this.props.nodes.slice(0,5).map((n) => {
              return (
                <div key={n.text} className='line' onClick={() => {this.props.updateSelected({selected:'node',node:n.text})}}>
                  <p className='main'><a href='#' >{n.text}</a></p><p className='sub'>{n.value} articles</p>
                </div>
              )
            })
          }
          </div>
          <h2>top connections</h2>
          <Connections edges={this.props.edges} updateSelected={this.props.updateSelected} limit={5}/>
          <h2>word cloud</h2>
          <WordCloud data={this.props.nodes} fontSizeMapper={(d) => {return (Math.log2(d.value)/Math.log2(max)*50)}} rotate={0} width={350} height={250}/>
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