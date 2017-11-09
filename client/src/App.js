import React, { Component } from 'react';
import './App.css';
import { recognize, stopRecognize } from './helpers/recognize.js';
import { podSearch } from './helpers/podsearch.js';
import { Input, Button } from 'semantic-ui-react';

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
        <Input type='text' id='search'/>
        <Button onClick={ this.search }>Search</Button>
        <ol> { this.state.data.map((pod) => {
          return <li>
            <a href={ pod.mygpo_link }>{ pod.title }</a>
          </li>;
        }) } </ol>
        <Input type='file' id='audiofile'/>
        <Button onClick={ recognize }>Recognize</Button>
        <Button onClick={ stopRecognize }>Stop</Button>
        <p id='output'></p>
      </div>
    );
  }
}

export default App;
