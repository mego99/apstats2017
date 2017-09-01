"use strict";
var superbowl = {};

superbowl.svg = d3.select('.superbowl-ch')
  .attr('width','70vw')
  .attr('height',620);

d3.csv('scripts/superbowl.js',
  function row(d) {
    return {
      win: +d.win,
      loss: +d.loss,
      margin: +d.margin,
      winner: d.winner,
      year: +d.year
    }
  },function(error, data) {
      console.log(data);
  })
