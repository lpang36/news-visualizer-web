import React, { Component } from 'react';
import * as d3 from 'd3';
import logo from './logo.svg';

class Time extends Component {
  componentDidMount() {
    this.createGrid()
  }
  componentDidUpdate() {
    this.createGrid()
  }
  createGrid = () => {
    d3.select('#grid svg').remove()
    var width = 400
    var height = 200
    var top_margin = 30
    var left_margin = 70
    var box_w = ((width - left_margin) / 7) + 1
    var box_h = ((height - top_margin) / 8) + 1
    var count = 0
    var array = []
    for (var i = 0; i<6*7; i++) {
      array.push({value:0,index:0})
    }
    var today = new Date() 
    var max = 0
    this.props.data.forEach((article) => {
      var time = new Date(article.time)
      var i = (today.getDay()-time.getDay())%7
      var j = Math.floor(time.getHours()/4)
      if (array[i*6+j].value===0) {
        array[i*6+j].index = count
      }
      array[i*6+j].value+=1
      max = Math.max(array[i*6+j].value,max)
      count++
    })
    var heatmap = d3.scaleLinear()
      .domain([0,max])
      .range(['#ffffff','#000000'])
    var xScale = d3.scaleOrdinal()
      .domain(d3.range(0,6,1))
      .range(d3.range(0,(box_w+1)*6,box_w+1))
    var yScale = d3.scaleOrdinal()
      .domain(d3.range(0,7,1))
      .range(d3.range(0,(box_h+1)*7,box_h+1))
    var chart = d3.select('#grid')
      .append('svg')
      .attr('class','grid svg')
      .attr('class','chart')
      .attr('width',width)
      .attr('height',height)
    var piece = chart.append('g')
      .selectAll('rect')
      .data(array)
      .enter().append('rect')
         .attr('class','piece')
        .attr('width',box_w)
        .attr('height',box_h)
        .attr('fill',(a) => {return heatmap(a.value)})
        .attr('transform',(a,b) => {
            var dx = xScale(b%6)+left_margin
            var dy = yScale(Math.floor(b/6))+top_margin
            return 'translate('+dx+','+dy+')'
          })
    piece.append('title')
      .data(array)
      .text((d) => {return d.value+' articles'})
    var yAxisScale = d3.scaleOrdinal()
      .domain(['now','yesterday','2 days ago','3 days ago','4 days ago','5 days ago','6 days ago','7 days ago'])
      .range(d3.range(0,(box_h+1)*8,box_h+1))
    var yAxis = d3.axisLeft()
      .scale(yAxisScale)
    var xAxisScale = d3.scaleOrdinal()
      .domain(['12AM','4AM','8AM','12PM','4PM','8PM','12AM'])
      .range(d3.range(0,(box_w+1)*7,box_w+1))
    var xAxis = d3.axisTop()
      .scale(xAxisScale)
    chart.append('g')
      .attr('class','y axis')
      .attr('transform','translate('+left_margin+','+top_margin+')')
      .call(yAxis)
    chart.append('g')
      .attr('class','x axis')
      .attr('transform','translate('+left_margin+','+top_margin+')')
      .call(xAxis)
    d3.selectAll('.piece').on('click',function(d) {
      updateIndexHandler(d.index)
    })
    var updateIndexHandler = (ind) => {
      this.props.updateIndex(ind)
    }
  }
  render() {
    return (
      <div id='grid'></div>
      );
  }
}

export default Time