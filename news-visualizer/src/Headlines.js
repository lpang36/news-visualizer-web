import React, { Component } from 'react';
import logo from './logo.svg';

class Headlines extends Component {
  render() {
    return (
      <div>
      {
        this.props.data.slice(this.props.index,this.props.index+10).map((a) => {
         return (
         <div key={a.url} class='article'>
          <a href={a.url} target='_blank'>{a.title}</a>
         </div>
         );
        })
      }
      </div>
      );
  }
}

export default Headlines