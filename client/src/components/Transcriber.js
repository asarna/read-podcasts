import React from 'react';
import { recognize, stopRecognize } from '../helpers/recognize.js';
import { Button } from 'semantic-ui-react';

export default class Transcriber extends React.Component {
  render() {
    return <div>
      <input type='file' id='audiofile'/>
      <Button 
        onClick={ recognize }
        fluid
      >
        Transcribe
      </Button>
      <Button onClick={ stopRecognize }>Stop</Button>
      <p id='output'></p>
    </div>
  }
}