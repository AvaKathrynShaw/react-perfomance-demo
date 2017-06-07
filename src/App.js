import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Perf from 'react-addons-perf'

import {STATIC_ARRAY} from './data'

class App extends Component {
  constructor(props) {
      super(props);

      this.state = { dynamicElements:[],
                     staticElements:false };
      window.Perf = Perf;
  }

  addElements = () => {
    Perf.start();
    //TODO: Add Const vs Let in ES6
    const updatedArr = []
    for(let i = 20000; i > 0; i--){
      updatedArr.push({label:i});
    }
    this.setState({dynamicElements:updatedArr})
  }

  addElementsPerf = () => {
    console.log("Dynamic");
    Perf.start();
    //TODO: Add Const vs Let in ES6
    const updatedArr = []
    for(let i = 20000; i > 0; i--){
      updatedArr.push({label:i});
    }
    this.setState({dynamicElements:updatedArr}, () => {
      Perf.stop();
      const measurements = Perf.getLastMeasurements();
      console.log("Inclusive");
      Perf.printInclusive(measurements);
      console.log("Exclusive");
      Perf.printExclusive(measurements);
      console.log("Wasted");
      Perf.printWasted(measurements);
      console.log("Operations");
      Perf.printOperations(measurements);
    })
  }

  addStaticPerf = () => {
    const {staticElements} = this.state
    console.log("Static");
    Perf.start();
    this.setState({staticElements:!staticElements}, () => {
      Perf.stop();
      const measurements = Perf.getLastMeasurements();
      console.log("Inclusive");
      Perf.printInclusive(measurements);
      console.log("Exclusive");
      Perf.printExclusive(measurements);
      console.log("Wasted");
      Perf.printWasted(measurements);
      console.log("Operations");
      Perf.printOperations(measurements);
    })
  }

  reset = () => {
    this.setState({
      dynamicElements:[],
      staticElements:false
    })
  }

  render() {
    const{dynamicElements, staticElements} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Perfomance Optimization</h2>
        </div>
        <button onClick={this.reset}>Reset</button>
          <div className="flex">
            <button onClick={()=>this.setState({staticElements:!staticElements})}>
                Static Add
            </button>
            <button onClick={this.addStaticPerf}>
                Static Add
            </button>
          <button onClick={this.addElements}>
              Dynamic Add
          </button>
          <button onClick={this.addElementsPerf}>
              Dynamic Add w/ Perf
          </button>
          <div className="container">
            {dynamicElements.length > 0 ? dynamicElements.map(element => {
              return <Box key={element.label} label={element.label}/>
            }) : null}
          </div>
          <div className="container">
            {staticElements ? STATIC_ARRAY.map(element => {
              return <Box key={element.label} label={element.label}/>
            }) : null}
          </div>
          </div>
      </div>
    );
  }
}

export default App;


class Box extends Component {
  render() {
    return (
      <div className="box">
        <p>{this.props.label}</p>
      </div>
    );
  }
}
