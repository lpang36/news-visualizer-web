import React, { Component } from 'react';
import logo from './logo.svg';

class Connections extends Component {
  render() {
    function compare_edges(a,b) {
      if (a.value > b.value) {
      return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
      return 0;
    }
    return (
      <div> 
      <div>
      {
        this.props.name ?
        (<p>{this.props.edges.length} connections</p>) :
        (<p></p>)
      }
      </div>
      {
        this.props.edges.sort(compare_edges).slice(0,this.props.limit).map((e) => {
          if (this.props.name) {
            var dest = e.source===this.props.name ? e.target : e.source
            return (
              <p key={dest}><a href='#' onClick={() => {this.props.updateSelected({selected:'edge',source:this.props.name,target:dest})}}>{this.props.name} ↔ {dest}</a>: {e.value} articles</p>
            );
          }
          else {
            return (
              <p key={e.source}><a href='#' onClick={() => {this.props.updateSelected({selected:'edge',source:e.source,target:e.target})}}>{e.source} ↔ {e.target}</a>: {e.value} articles</p>
            );
          }
        })
      }
      </div>
      );
  }
}

export default Connections