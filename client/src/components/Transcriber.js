import React from 'react';
import { recognize, stopRecognize } from '../helpers/recognize.js';
import { download } from '../helpers/download.js';
import { Button, Transition, Divider } from 'semantic-ui-react';
import Transcript from './Transcript';

export default class Transcriber extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showTranscript: false
    }
  }

  handleClick() {
    this.setState({
      showTranscript: true
    });
    download(this.props.audio)
      .then(() => {
        recognize();
      }); 
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