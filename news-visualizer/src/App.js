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
      node:'',
      source:'',
      target:'',
      graph:{},
      data:{'type':'none'}
    }
  }
  updateSelected = (dict) => {
    this.setState(dict)
  }
  componentDidUpdate(prevProps,prevState,snapshot) {
    var check = (args) => {
      var marker = true
      args.forEach((a) => {
        if (!(prevState[a]===this.state[a])) {
          marker = false
        }
      })
      return marker
    }
    if ((!check(['selected','node','source','target']))&&(!(this.state.selected==='none'))) {
      var data = {}
      if (this.state.selected==='node') {
        var d = this.state.graph.nodes.filter((n) => {return n.id===this.state.node})[0]
        var edges = this.state.graph.edges.filter((data) => {return (data.source.id===d.id||data.target.id===d.id);})
        data = {
          type: 'node',
          name: d.id,
          size: d.size,
          edges: edges.map((data) => {return {source: data.source.id, target: data.target.id, value: data.value}}),
          articles: d.articles
        }
      }
      else if (this.state.selected==='edge') {
        var d = this.state.graph.edges.filter((n) => {return (n.source.id===this.state.source&&n.target.id===this.state.target)||(n.source.id===this.state.target&&n.target.id===this.state.source)})[0]
        var source_dict = {}
        d.source.articles.forEach((a) => {
          source_dict[a.url] = true
        })
        var articles = []
        d.target.articles.forEach((a) => {
          if (a.url in source_dict)
            articles.push(a)
        })
        data = {
          type: 'edge',
          source: d.source.id,
          target: d.target.id,
          value: d.value,
          articles: articles
        }
      }
      this.setState({'data':data})
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <Graph size={[960,600]} selected={this.state.selected} updateSelected={this.updateSelected}/>
          <div>
          {
            this.state.selected===this.state.data.type ? 
            (<Panel selected={this.state.selected} data={this.state.data} updateSelected={this.updateSelected}/>) :
            (<Panel selected='none' data={this.state.data} updateSelected={this.updateSelected}/>)
          } 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
