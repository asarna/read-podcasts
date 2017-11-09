import React, { Component } from 'react';
import './App.css';
import sayHello from './client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: ''
    }
  }

  greet(query) {
    sayHello(query, res => {
      this.setState({
        greeting: res.greeting
      })
    })
  }

  render() {
    if(this.state.greeting === '') {
      this.greet('hey there');
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          { this.state.greeting }
        </p>
      </div>
    );
  }
}

export default App;
