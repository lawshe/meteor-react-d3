import React from 'react';
import * as d3 from 'd3';

/*
  Game Loop Animation
*/

const Component = React.Component;

const Ball = ({ x, y }) => (
  <circle cx={x} cy={y} r="5" />
);

const MAX_H = 550;

export default class BallClass extends Component {
  constructor() {
    super();

    this.state = {
      y: 5,
      vy: 0
    }
  }

  componentDidMount() {
    this.timer = d3.timer(() => this.gameLoop());
    this.gameLoop();
  }

  componentWillUnmount() {
    // stop loop
    this.timer.stop()
  }

  gameLoop() {
    // move ball
    let { y, vy, lastFrame } = this.state;

    if (y > MAX_H) {
      vy = -vy*.87;
    }

    let frames = 1;

    if (lastFrame) {
      frames = (d3.now()-lastFrame)/(1000/60);
      // a high resolution timestamp that's pegged to requestAnimationFrame. D3 guarantees that every d3.now() called within the same frame gets the same timestamp.
      // frames = How many frames were meant to have happened since last iteration. Most of the time this value will be 1
      // Our physics should look correct now regardless of browser throttling.
    }

    this.setState({
      y: y+vy*frames,
      vy: vy+0.3*frames,
      lastFrame: d3.now()
    })
  }

  render() {
    return (
      <svg width="100%" height={MAX_H}>
        <Ball x={50} y={this.state.y} />
      </svg>
    )
  }
}
