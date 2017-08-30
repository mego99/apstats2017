"use strict";

var svg = d3.select('.olympics-ch')
  .attr('width','70vw')
  .attr('height',620);

d3.csv('data/olympics.csv',
  function row(d){
    var reg = new RegExp(/([^\x00-\x7F])|(\(\w*\))/,'g');
    d.country = d.country.replace(reg,'');

    return {
      rank: +d.rank,
      country: d.country,
      gold: +d.gold,
      silver: +d.silver,
      bronze: +d.bronze,
      total: +d.total
    }
  },
  function(error, data){
    if (error) return console.error(error);

    console.log(data);

    var y = d3.scaleLinear()
      .range([0,500])
      .domain([40,0]);

    var w = (Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) * .7;
    var topPadding = 10;
    var leftPadding = 30;

    var x = d3.scaleBand()
      // .padding(0.1)
      .range([0,w])
      .domain(data
        .map(function(d){return d.country})
        // .permute(function(d){return d.country},function(d){return d.total})
      );

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y).ticks(20);

    svg.append('g')
      .call(xAxis)
      .attr('transform','translate('+leftPadding+','+(500+topPadding)+')')
      .attr('class','x-axis');

    svg.append('g')
      .call(yAxis)
      .attr('transform','translate('+leftPadding+','+topPadding+')');

    svg.selectAll('.x-axis text')
      .attr('transform','translate(12,10) rotate(90) ')
      .attr('text-anchor','start');

    var chart = svg.append('g')
      .attr('transform','translate('+leftPadding+','+topPadding+')');

    var bars = chart.append('g').selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('x',function(d){return x(d.country)})
        .attr('height',function(d){return 500 - y(d.total)})
        .attr('y',function(d){return y(d.total)})
        .attr('width',33)
        .attr('transform','translate(0,0)')
        .style('fill','#f75521');

      var barsGold = chart.append('g').selectAll('.bar')
        .data(data)
        .enter().append('rect')
          .attr('x',function(d){return x(d.country)})
          .attr('height',function(d){return 500 - y(d.silver + d.gold)})
          .attr('y',function(d){return y(d.silver + d.gold)})
          .attr('width',33)
          .attr('transform','translate(0,0)')
          .style('fill','#f09b2a');

      var barsGold = chart.append('g').selectAll('.bar')
        .data(data)
        .enter().append('rect')
          .attr('x',function(d){return x(d.country)})
          .attr('height',function(d){return 500 - y(d.silver)})
          .attr('y',function(d){return y(d.silver)})
          .attr('width',33)
          .attr('transform','translate(0,0)')
          .style('fill','#d7d7d7');


  }
)
