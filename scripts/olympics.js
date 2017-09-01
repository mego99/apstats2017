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

    var y = d3.scaleLinear()
      .range([0,500])
      .domain([34,0]);

    var topPadding = 10;
    var leftPadding = 30;
    var w = ((Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) * .7) - leftPadding;

    var x = d3.scaleBand()
      .padding(0.1)
      .range([0,w])
      .domain(data
        .map(function(d){return d.country})
        // .permute(function(d){return d.country},function(d){return d.total})
      );

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y).ticks(20);

    var gX = svg.append('g')
      .call(xAxis)
      .attr('transform','translate('+leftPadding+','+(500+topPadding)+')')
      .attr('class','x-axis');

    var gold = '#ffc647';
    var silver = '#e6e1db';
    var bronze = '#ff7b50';

    svg.selectAll('.x-axis text')
      .attr('transform','translate(12,10) rotate(90) ')
      .attr('text-anchor','start');

    var chart = svg.append('g')
      .attr('transform','translate('+leftPadding+','+topPadding+')').attr('class','chart');

    var bars = chart.append('g').selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('x',function(d){return x(d.country)})
        .attr('height',function(d){return 500 - y(d.total)})
        .attr('y',function(d){return y(d.total)})
        .attr('width',x.bandwidth())
        .style('fill',bronze);

      var barsGold = chart.append('g').selectAll('.bar')
        .data(data)
        .enter().append('rect')
          .attr('x',function(d){return x(d.country)})
          .attr('height',function(d){return 500 - y(d.silver + d.gold)})
          .attr('y',function(d){return y(d.silver + d.gold)})
          .attr('width',x.bandwidth())
          .style('fill',silver);

      var barsGold = chart.append('g').selectAll('.bar')
        .data(data)
        .enter().append('rect')
          .attr('x',function(d){return x(d.country)})
          .attr('height',function(d){return 500 - y(d.gold)})
          .attr('y',function(d){return y(d.gold)})
          .attr('width',x.bandwidth())
          .style('fill',gold);

          var gY = svg.append('g')
            .call(yAxis)
            .attr('transform','translate('+leftPadding+','+topPadding+')');

      var legend = svg.append('g').attr('class','legend');
        legend.append('rect').attr('class','legend-lab').attr('x',0).attr('width',x.bandwidth()).attr('height',x.bandwidth()).style('fill',gold);
        legend.append('text').attr('class','legend-lab').attr('x',0).attr('y',x.bandwidth()*1.5).text('gold');
        legend.append('rect').attr('class','legend-lab').attr('x',x.bandwidth()*2).attr('width',x.bandwidth()).attr('height',x.bandwidth()).style('fill',silver);
        legend.append('text').attr('class','legend-lab').attr('x',x.bandwidth()*2).attr('y',x.bandwidth()*1.5).text('silver');
        legend.append('rect').attr('class','legend-lab').attr('x',x.bandwidth()*4).attr('width',x.bandwidth()).attr('height',x.bandwidth()).style('fill',bronze);
        legend.append('text').attr('class','legend-lab').attr('x',x.bandwidth()*4).attr('y',x.bandwidth()*1.5).text('bronze');
      legend.attr('transform','translate('+(w*0.7)+',0)');
  }
)
