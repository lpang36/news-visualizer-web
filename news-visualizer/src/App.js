import React, { Component } from 'react';
import logo from './logo.svg';
import Graph from './Graph'
import Panel from './Panel'
import Overview from './Overview'
import $ from "jquery";

class App extends Component {
  constructor() {
    super()
    this.state = {
      selected:'none',
      node:'',
      source:'',
      target:'',
      all_nodes:[],
      top_edges:[],
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
    if ($.isEmptyObject(prevState.graph)&&!$.isEmptyObject(this.state.graph)) {
      function compare_nodes(a,b) {
        if (a.value > b.value) {
        return -1;
        }
        if (a.value < b.value) {
          return 1;
        }
        return 0;
      }
      this.setState({'all_nodes':this.state.graph.nodes.map((n) => {return {text:n.id,value:n.size}}).sort(compare_nodes)})
      function compare_edges(a,b) {
        if (a.value > b.value) {
        return -1;
        }
        if (a.value < b.value) {
          return 1;
        }
        return 0;
      }
      this.setState({'top_edges':this.state.graph.edges.map((e) => {return {source:e.source.id,target:e.target.id,value:e.value}}).sort(compare_edges).slice(0,5)})
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <Graph selected={this.state.selected} updateSelected={this.updateSelected}/>
          <div>
          {
            this.state.selected===this.state.data.type ? 
            (<Panel selected={this.state.selected} data={this.state.data} updateSelected={this.updateSelected}/>) :
            (<Panel selected='none' data={this.state.data} updateSelected={this.updateSelected}/>)
          } 
          </div>
          <Overview nodes={this.state.all_nodes} edges={this.state.top_edges} updateSelected={this.updateSelected} /> 
        </div>
      </div>
    );
  }
}

export default App;
