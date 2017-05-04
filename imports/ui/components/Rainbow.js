import React from 'react';
import * as d3 from 'd3';
const Component = React.Component;

class Dot extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, props, {r: 5});
  }

  componentWillReceiveProps(props) {
    // copy props to state
  }

  flash() {
    let node = d3.select(this.refs.circle);
    // D3 to take over the rendering

    this.setState({colorize: true});
    // triggers a re-render

    node.transition()
        .attr('r', 30)
        .duration(250)
        .ease(d3.easeCubicOut)
        .transition()
        .attr('r', 5)
        .duration(1500)
        .ease(d3.easeCubicOut)
        .on('end', () => this.setState({colorize: false}));
  }

  get color() {
    const { x, y, maxPos } = this.state;

    const t = d3.scaleLinear()
                .domain([0, 1.2*maxPos**2])
                .range([0, 1]);

    return d3.interpolateWarm(t(x**5 + y**5));
  }

  render() {
    const { x, y, r, colorize } = this.state;

    return <circle cx={x} cy={y} r={r}
             ref="circle" onMouseOver={this.flash.bind(this)}
             style={{fill: colorize ? this.color : 'black'}} />
  }
}

export default class Rainbow extends Component {
  render() {
    const width = 600,
          N = 50,
          pos = d3.scalePoint()
                  .domain(d3.range(N))
                  .range([0, width])
                  .padding(5)
                  .round(true);

    return (
      <svg width="600" height="600">
        {d3.range(N).map(x =>
           d3.range(N).map(y =>
             <Dot x={pos(x)} y={pos(y)} key={`${x}-${y}`}
                  maxPos={width} />
        ))}
      </svg>
    )
  }
}
