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
        (<div></div>)
      }
      </div>
      {
        this.props.edges.sort(compare_edges).slice(0,this.props.limit).map((e) => {
          if (this.props.name) {
            var dest = e.source===this.props.name ? e.target : e.source
            return (
              <div className='line' onClick={() => {this.props.updateSelected({selected:'edge',source:this.props.name,target:dest})}}>
              <p key={dest} className='main'><a href='#' >{this.props.name} ↔ {dest}</a></p><p className='sub'>{e.value} articles</p>
              </div>
            );
          }
          else {
            return (
              <div className='line' onClick={() => {this.props.updateSelected({selected:'edge',source:e.source,target:e.target})}}>
              <p key={e.source} className='main'><a href='#' >{e.source} ↔ {e.target}</a></p><p className='sub'>{e.value} articles</p>
              </div>
            );
          }
        })
      }
      </div>
      );
  }
}

export default Connections