import React from 'react';
const Component = React.Component;

export function D3blackbox(D3render) {
  return class Blackbox extends React.Component {
    componentDidMount() {
      D3render.call(this);
    }

    componentDidUpdate() {
      D3render.call(this)
    }

    render() {
      const { x, y } = this.props;

      return(
        <svg>
          <g transform={`translate(${x}, ${y})`} ref="g" />
        </svg>
      );
    }
  }
}
