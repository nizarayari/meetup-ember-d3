import Component from '@ember/component';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent, max } from 'd3-array';

export default Component.extend({

  classNames: ['bar-chart'],

  //this hook will render our chart
  didInsertElement() {
    let balances = this.get('balances')
    let svg = select(this.$('svg')[0]) //first item in the array
    const width = 800;
    const height = 300;
    const margin = {top: 20, bottom: 20, left: 20, right: 20};

    //Scale for x-axis date time
    var xExtent = extent(balances, d => new Date(d.date));
    var xScale = scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right]);

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
    .attr('width', 20)
    .attr('height', (d) => heightScale(d.value))
    .attr('x', (d) => xScale(new Date(d.date)))
    .attr('y', (d) => yScale(d.value))
    .attr('fill', 'blue')
    .attr('stroke', 'white');

  }
});
