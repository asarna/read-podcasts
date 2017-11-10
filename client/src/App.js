import React, { Component } from 'react';
import './App.css';
import Wrapper from './components/Wrapper.js';
import { Container } from 'semantic-ui-react';

class App extends Component {

  render() {
    return (
      <Container className="App">
        <div className="App-header">
          <h2>Podcast Reader</h2>
        </div>
        <Wrapper />
      </Container>
    );
  }
}

export default App;
