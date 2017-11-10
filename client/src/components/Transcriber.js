import React from 'react';
import { recognize, stopRecognize } from '../helpers/recognize.js';
import { Button } from 'semantic-ui-react';

export default class Transcriber extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    recognize(this.props.audio);
  }

  render() {
    return <div>
      <Button 
        onClick={ this.handleClick }
        fluid
        color='olive'
      >
        Transcribe
      </Button>
      <Button onClick={ stopRecognize }>Stop</Button>
      <p id='output'></p>
    </div>
  }
}