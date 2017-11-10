import React, { Component } from 'react';
import './App.css';
import { recognize, stopRecognize } from './helpers/recognize.js';
import PodPicker from './components/PodPicker.js';
import { Container } from 'semantic-ui-react';

class App extends Component {

  render() {
    return (
      <Container className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <PodPicker />
        <input type='file' id='audiofile'/>
        <button onClick={ recognize }>Recognize</button>
        <button onClick={ stopRecognize }>Stop</button>
        <p id='output'></p>
      </Container>
    );
  }
}

export default App;
