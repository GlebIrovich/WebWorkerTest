import React, { Component } from 'react';
import './App.css';
import WebWorker from './WebWorker';
import worker from './app.worker';

class App extends Component {
  
  state = { x: 0, time: 100, color: "red" }

  componentDidMount() {
    this.worker = new WebWorker(worker);
  }
  render() {
    return (
      <div className="App">
        <div style={{ margin: 10, fontSize: 20 }}> {this.state.x} </div>
        <input
          type="text"
          value={ this.state.time }
          onChange={ (e) => this.setState({ time: e.currentTarget.value }) }
        />
        <button onClick={ this.runWorkerTask }> 
          Spawn Worker 
        </button>

        <button onClick={ this.runWithoutWorker }> 
          Run on the main thread
        </button>

        <span onClick={ () => this.setState({ color: this.setRandomColor() }) } style={{ backgroundColor: this.state.color, width: 80, height: 80, display: 'block', margin: '150px auto', }}>
          Click me
        </span>
      </div>
    );
  }

  setRandomColor = () => `rgb(${this.color()},${this.color()},${this.color()})`

  color = () => Math.floor(Math.random() * 255)

  runWithoutWorker = () => {
    console.log('Main thread started', `time ${this.state.time}`);
    const startTime = Date.now();
    let x = 0;
    while ((Date.now() - startTime) < parseInt(this.state.time)) {
      x += 0.001;
    }
    console.log('Main job completed', x);
    this.setState({ x })
  }

  runWorkerTask = () => {
    this.worker.postMessage({ time: parseInt(this.state.time)});
    this.worker.addEventListener('message', event => {
      const x = event.data;
      this.setState({
          x,
      })
    });
  }
}

export default App;
