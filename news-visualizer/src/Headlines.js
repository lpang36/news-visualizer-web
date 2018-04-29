import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Headlines extends Component {
  render() {
    return (
      <div>
      {
        this.props.data.slice(0,10).map((a) => {
         return (
         <div>
          <a href={a.url} target='_blank'>{a.title}</a>
          <p>{a.time}</p>
         </div>
         );
        })
      }
      </div>
      );
  }
}

export default Headlines