import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'

class Graph extends Component {
   constructor(props){
      super(props)
      this.createGraph = this.createGraph.bind(this)
   }
   componentDidMount() {
      this.createGraph(this)
   }
   componentDidUpdate() {
      //this.createGraph(this)
   }
   createGraph(component) {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var g = svg.append("g")
        .attr("class", "everything");

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.01))
        .force("charge", d3.forceManyBody().strength(-30))
        .force("center", d3.forceCenter(width / 2, height / 2));
    
    fetch('https://raw.githubusercontent.com/lpang36/news-visualizer/master/data/graph.json').then((res)=>res.json()).then((graph)=>{
      var factor = 1
      graph.edges = graph.edges.map(function(d) {d.value = factor*d.value; return d})
      var limit = Math.max.apply(Math,graph.edges.map(function (d) {return d.value}))

      var link = g.append("g")
          .attr("class", "edges")
        .selectAll("line")
        .data(graph.edges)
        .enter().append("line")
          .attr("class","edge")
          .attr("stroke-width", function(d) { return (Math.sqrt(d.value)/factor); })
          .attr("stroke",function(d) {var c = d3.rgb(255,0,0); c.opacity = d.value/factor/limit/2; return c;});

      var node = g.append("g")
          .attr("class","nodes")
        .selectAll("node")
        .data(graph.nodes)
        .enter().append("g")
          .attr("class","node")
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      node.append("circle")
          .attr("class","circle")
          .attr("fill", function() {var c = d3.rgb('#ff0000'); c.opacity = 0.5; return c;})
          .attr("r", function(d) {return Math.sqrt(d.size);});

      node.append("text")
          .attr("class","text")
          .attr("font-size","12px")
          .attr("text-anchor", "middle")
          .text(function(d) {return d.label;});

      simulation
          .nodes(graph.nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(graph.edges);

      var emphasis = 3

      d3.selectAll(".node").on('mouseover',function(d) {
        d3.select(this).selectAll(".circle")
          .attr("fill",function() {var c = d3.rgb(d3.select(this).attr("fill")); c.opacity = emphasis*c.opacity; return c;})
        d3.selectAll(".edge").filter(function(data) {return (data.source.id===d.id||data.target.id===d.id);})
          .attr("stroke",function(data) {var c = d3.rgb(d3.select(this).attr("stroke"));c.opacity = emphasis*c.opacity;return c;})
      })

      d3.selectAll(".node").on('mouseout',function(d) {
        d3.select(this).selectAll(".circle")
          .attr("fill",function() {var c = d3.rgb(d3.select(this).attr("fill")); c.opacity = c.opacity/emphasis; return c;})
        d3.selectAll(".edge").filter(function(data) {return (data.source.id===d.id||data.target.id===d.id);})
          .attr("stroke",function(data) {var c = d3.rgb(d3.select(this).attr("stroke"));c.opacity = c.opacity/emphasis;return c;});
      })

      d3.selectAll(".edge").on('mouseover',function(d) {
        d3.select(this)
          .attr("stroke",function(data) {var c = d3.rgb(d3.select(this).attr("stroke"));c.opacity = emphasis*c.opacity;return c;})
        d3.selectAll(".circle").filter(function(data) {return (d.source.id===data.id||d.target.id===data.id);})
          .attr("fill",function() {var c = d3.rgb(d3.select(this).attr("fill")); c.opacity = emphasis*c.opacity; return c;})
      })

      d3.selectAll(".edge").on('mouseout',function(d) {
        d3.select(this)
          .attr("stroke",function(data) {var c = d3.rgb(d3.select(this).attr("stroke"));c.opacity = c.opacity/emphasis;return c;})
        d3.selectAll(".circle").filter(function(data) {return (d.source.id===data.id||d.target.id===data.id);})
          .attr("fill",function() {var c = d3.rgb(d3.select(this).attr("fill")); c.opacity = c.opacity/emphasis; return c;})
      })

      d3.selectAll(".node").on('click',function(d) {
        var edges = graph.edges.filter((data) => {return (data.source.id===d.id||data.target.id===d.id);})
        var data = {
          name: d.id,
          edges: edges.map((data) => {return {source: data.source.id, target: data.target.id, value: data.value}})
        }
        updateSelectedInnerHandler('node',data)
      })

      d3.selectAll(".edge").on('click',function(d) {
        var data = {
          source: d.source.id,
          target: d.target.id,
          value: d.value
        }
        updateSelectedInnerHandler('edge',data)
      })

      function updateSelectedInnerHandler(val,data) {
        updateSelectedHandler(val,data)
      }
      
      function ticked() {
        link
            .attr("x1", function(d) { return (d.source.x); })
            .attr("y1", function(d) { return (d.source.y); })
            .attr("x2", function(d) { return (d.target.x); })
            .attr("y2", function(d) { return (d.target.y); });

        node
            .attr("cx", function(d) { return (d.x); })
            .attr("cy", function(d) { return (d.y); });

        node.selectAll("circle")
            .attr("cx", function(d) { return (d.x); })
            .attr("cy", function(d) { return (d.y); });

        node.selectAll("text")
            .attr("x", function(d) { return (d.x); })
            .attr("y", function(d) { return (d.y); });
      }
    });

    var zoom_handler = d3.zoom()
      .on("zoom", zoom_actions);

    zoom_handler(svg);

    function zoom_actions(){
      g.attr("transform", d3.event.transform)
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
     
    function updateSelectedHandler(val,data) {
      component.updateSelected(val,data)
    }
   }
  updateSelected = (val,data) => {
    this.props.updateSelected(val,data)
  }
  render() {
      return <svg ref={node => this.node = node}
      width={this.props.size[0]} height={this.props.size[1]}>
      </svg>
   }
}
export default Graph