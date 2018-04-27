import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph'
import Panel from './Panel'

class App extends Component {
  constructor() {
    super()
    this.state = {
      selected:'none',
      data:{}
    }
  }
  updateSelected = (val,dat) => {
    this.setState({selected:val,data:dat})
  }
  render() {
    return (
      <div className="App">
        <div>
          <Graph size={[960,600]} selected={this.state.selected} updateSelected={this.updateSelected} />
          <Panel selected={this.state.selected} data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
