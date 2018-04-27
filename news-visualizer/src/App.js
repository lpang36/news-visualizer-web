import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Graph size={[960,600]} />
        </div>
      </div>
    );
  }
}

export default App;
