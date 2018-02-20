import Component from '@ember/component';
import { scaleOrdinal } from 'd3-scale';
import { arc, pie } from 'd3-shape';
import { select } from 'd3-selection';

export default Component.extend({

  didInsertElement() {
    const expenses = this.get('expenses')
    var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

    var color = scaleOrdinal()
      .range(["#F9ED69", "#F08A5D", "#B83B5E", "#3D84A8", "#30E3CA"])

    var arcs = arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

// defines wedge size
var pies = pie()
    .sort(null)
    .value(function (d) { return d.value; });

var svg = select(this.$('svg')[0])
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
    .data(pies(expenses))
    .enter().append("g")
    .attr("class", "arc");

    g.append("path")
    .attr("d", arcs)
    .style("fill", function(d) { 
      return color(d.data.category); });

    g.append("text")
    .attr("transform", function (d) { return "translate(" + arcs.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style("fill", "#393E46")
    .text(function (d) { return d.data.category; });
  }
});
