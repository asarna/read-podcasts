import React, { Component } from 'react';
import './App.css';
import { recognize } from './helpers/recognize.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <input type='file' id='audiofile'/>
        <button onClick={ recognize }>Recognize</button>
        <p id='output'></p>
      </div>
    );
  }
}

export default App;
