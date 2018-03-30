import React from 'react';
import { download } from '../helpers/download.js';
import { Button, Transition, Divider } from 'semantic-ui-react';
import Transcript from './Transcript';
import axios from 'axios';
import recognizeFile from 'watson-speech/speech-to-text/recognize-file';

export default class Transcriber extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.stopTranscribing = this.stopTranscribing.bind(this);
    this.state = {
      showTranscript: false,
      token: '',
      transcript: ''
    }
  }

  getToken() {
    const tokenConfig = {
      url: '/api/token',
      method: 'get',
    }
    return axios(tokenConfig)
      .then((response) => {
        this.setState({
          token: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  startTranscribing() {
    this.setState({
      transcribing: true
    });
    download(this.props.audio).then(() => {
      this.getToken().then(() => {
        const stream = recognizeFile(({
          file: 'file.mp3',
          token: this.state.token,
          smart_formatting: true,
          format: true, // adds capitals, periods, and a few other things (client-side)
          model: 'en-US_BroadbandModel',
          objectMode: true,
          interim_results: true,
        }));
        this.stream = stream;
        stream
          .on('data', (msg) => {
            if (msg.results[0].final) {
              this.setState({ transcript: this.state.transcript.concat(msg.results[0].alternatives[0].transcript) })
            }
          })
          .on('end', this.handleTranscriptEnd)
          .on('error',() => {});
      });
    });
  }

  stopTranscribing() {
    if(this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
    }
    this.setState({
      transcribing: false
    });
  }

  handleTranscriptEnd() {
    this.stopTranscribing();
  }

  handleClick() {
    this.setState({
      showTranscript: true
    });
    this.props.setWrapperState({
      showPodPicker: false
    });
    this.startTranscribing();
  }

  handleBackClick() {
    this.stopTranscribing();
    this.setState({
      showTranscript: false,
      transcript: ''
    });
    this.props.setWrapperState({
      showPodPicker: true,
      showTranscriber: false
    });
  }

  render() {
    return <div>
      { !this.state.showTranscript &&
        <Button 
          onClick={ this.handleClick }
          fluid
          color='olive'
        >
          Transcribe
        </Button>
      }  
      <Transition 
        animation='fade down'
        duration={800}
        visible={ this.state.showTranscript }
      >
        <div>
          <Divider hidden />
          <Button content='Stop' icon='stop' labelPosition='left' color='olive' onClick={this.stopTranscribing}/>
          <Button content='Back to search' icon='left arrow' labelPosition='left' color='olive' onClick={this.handleBackClick}/>
          <Transcript 
            title={ this.props.title } 
            transcript={ this.state.transcript }
            transcribing={ this.state.transcribing }
          />
        </div>
      </Transition>
    </div>
  }
}