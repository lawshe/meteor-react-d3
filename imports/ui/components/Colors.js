import React from 'react';
import * as d3 from 'd3';

// Component that draws a single color swatch
const Swatch = ({ color, width, x, y }) => (
  <rect width={width} height="20" x={x} y={y} style={{fill: color}} />
);

let colors = d3.schemeCategory20;
let width = d3.scaleBand().domain(d3.range(20));

// Draws an entire color scale
export default class Colors extends React.Component {
  componentWillMount() {
    this.updateD3(this.props);
  }

  componentWillUpdate(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    width.range([0, props.width]);
  }

  render() {
    return (
      <svg id="svg-colors" height="40px">
        {d3.range(20).map(i => (
          <g key={i}><Swatch color={colors[i]} width={width.step()} x={width(i)} y="0" />
          <Swatch color={colors[20 - 1 -i]} width={width.step()} x={width(i)} y="20"/></g>
        ))}
      </svg>
    )
  }
}
