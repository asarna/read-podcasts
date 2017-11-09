import React, { Component } from 'react';
import './App.css';
import { recognize, stopRecognize } from './helpers/recognize.js';
import { podSearch } from './helpers/podsearch.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.search = this.search.bind(this);
  }

  search() {
    podSearch().then((response) => {
      console.log(response);
        this.setState({
          data: response
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <label>Search Podcasts</label>
        <input type='text' id='search'/>
        <button onClick={ this.search }>Search</button>
        <ol> { this.state.data.map((pod) => {
          return <li>
            <a href={ pod.mygpo_link }>{ pod.title }</a>
          </li>;
        }) } </ol>
        <input type='file' id='audiofile'/>
        <button onClick={ recognize }>Recognize</button>
        <button onClick={ stopRecognize }>Stop</button>
        <p id='output'></p>
      </div>
    );
  }
}

export default App;
