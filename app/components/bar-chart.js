import Component from '@ember/component';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat} from 'd3-time-format';

export default Component.extend({

  classNames: ['bar-chart'],

  //this hook will render our chart
  didInsertElement() {
    let balances = this.get('balances')
    let svg = select(this.$('svg')[0]) //first item in the array
    const margin = {top: 20, bottom: 20, left: 60, right: 20};
    const width = 600
    const height = 300

    //Scale for x-axis date time
    var xScale = scaleBand()
      .rangeRound([margin.left , width])
      .domain(balances.map(d => new Date(d.date)));


    //Scale for y-axis linear scale
    var yMax = max(balances, d => d.value);
    var yScale = scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    // Scale for bar's height
    var heightScale = scaleLinear()
    .domain([0, yMax])
    .range([0, height - margin.top - margin.bottom]);


    //Create rectangles
    svg.selectAll('rect')
    .data(balances) //D3 data binding
    .enter().append('rect')
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => heightScale(d.value))
    .attr('x', (d) => xScale(new Date(d.date)))
    .attr('y', (d) => yScale(d.value))
    .attr('fill', "url(#Gradient)")
    .attr('stroke', 'white');

    //x-Axis
    var xAxis = axisBottom()
    .scale(xScale)
    .tickFormat(timeFormat('%b'))
    
    //y-Axis
    var yAxis = axisLeft()
      .scale(yScale)
      .ticks(6)
  
    svg.append('g')
      .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      .call(xAxis);
    svg.append('g')
      .attr('transform', 'translate(' + [margin.left, 0] + ')')
      .call(yAxis);
  }
});
