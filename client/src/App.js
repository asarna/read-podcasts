import React, { Component } from 'react';
import './App.css';
import PodPicker from './components/PodPicker.js';
import Transcriber from './components/Transcriber.js';
import { Container, Divider } from 'semantic-ui-react';

class App extends Component {

  render() {
    return (
      <Container className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <PodPicker />
        <Divider />
        <Transcriber />
      </Container>
    );
  }
}

export default App;
