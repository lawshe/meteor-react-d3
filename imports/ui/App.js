import React from 'react';
import Axis from './components/Axis';
import Ball from './components/Ball';
import Colors from './components/Colors';
import Line from './components/Line';
import Rainbow from './components/Rainbow';


const examples = {
  rainbow: <Rainbow />,
  axis: <Axis x="10" y="50" />,
  ball: <Ball />,
  colors: <Colors width="400" />,
  line: <Line x="10" y="50" />
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ex: 'rainbow'
    }
  }

  handleExClick(e) {
    e.preventDefault();
    this.setState({ ex: e.target.id });
  }

  render() {

    const viewEx = examples[this.state.ex];

    let exList = [];

    for(var key in examples){
      let className = 'example';
      if (this.state.ex === key) {
        className += ' active';
      }
      exList.push(<a className={className} onClick={this.handleExClick.bind(this)} id={key} key={key} href="#">{key}</a>);
    }

    return (
      <div className="main">
        <h1>Meteor + React + D3</h1>

        <div className="examples">
          {exList}
        </div>

        <div className="svg-container">
          {viewEx}
        </div>

      </div>
    );
  }
}
