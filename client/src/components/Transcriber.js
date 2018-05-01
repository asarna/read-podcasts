import React from 'react';
import { Button, Transition, Divider, Message } from 'semantic-ui-react';
import Transcript from './Transcript';
import axios from 'axios';
import recognizeFile from 'watson-speech/speech-to-text/recognize-file';

export default class Transcriber extends React.Component {

  constructor(props) {
    super(props);
    this.handleTranscribeClick = this.handleTranscribeClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.stopTranscribing = this.stopTranscribing.bind(this);
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.state = {
      showTranscript: false,
      token: '',
      transcript: '',
      error: false,
      formattedMessages: []
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
      .catch((error) => {
        console.log(error);
      });
  };

  createStream() {
    const stream = recognizeFile(({
      file: 'file.mp3',
      token: this.state.token,
      smart_formatting: true,
      format: true,
      model: 'en-US_BroadbandModel',
      objectMode: true,
      interim_results: true,
      speaker_labels: true,
      timestamps: true,
      resultsBySpeaker: true,
      speakerlessInterim: true,
      word_alternatives_threshold: 0.01
    }));
    this.stream = stream;

    stream
      .on('data', this.handleFormattedMessage)
      .on('end', this.handleTranscriptEnd)
      .on('error', this.showError);
  };

  handleFormattedMessage(msg) {
    // if (msg.results[0].final) {
    //   this.setState({ transcript: this.state.transcript.concat(msg.results[0].alternatives[0].transcript) })
    // }
    this.setState({ formattedMessages: this.state.formattedMessages.concat(msg) });
  }

  // ------------------ //

  getCurrentInterimResult() {
    const r = this.state.formattedMessages[this.state.formattedMessages.length - 1];

    // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
    // However, all results in a given message will be either final or interim, so just checking
    // the first one still works here.
    if (!r || !r.results || !r.results.length || r.results[0].final) {
      return null;
    }
    return r;
  }

  getFinalAndLatestInterimResult() {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    }
    console.log('final', final);
    return `${final}.`;
  }

  getFinalResults() {
    return this.state.formattedMessages.filter(r => r.results &&
      r.results.length && r.results[0].final);
  }

  // ------------------ //

  showError() {
    this.setState({
      error: true
    });
  }

  download(url) {
    const urlEncoded = encodeURIComponent(url);
	  return axios.get(`/download/${urlEncoded}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      })
  }
  
  startTranscribing() {
    this.setState({
      transcribing: true
    });
    this.download(this.props.audio).then(() => {
      this.getToken().then(() => {
        this.createStream();
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

  handleTranscribeClick() {
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
    const { showTranscript, transcript, transcribing, error} = this.state;

    const messages = this.getFinalAndLatestInterimResult();

    return <div>
      { !showTranscript &&
        <Button 
          onClick={ this.handleTranscribeClick }
          fluid
          color='olive'
        >
          Transcribe
        </Button>
      }  
      <Transition 
        animation='fade down'
        duration={800}
        visible={ showTranscript }
      >
        <div>
          <Divider hidden />
          <Button content='Stop' icon='stop' labelPosition='left' color='olive' onClick={ this.stopTranscribing }/>
          <Button content='Back to search' icon='left arrow' labelPosition='left' color='olive' onClick={ this.handleBackClick }/>
          {error && transcribing && <Message negative>
            <p>Sorry, there was an error.</p>
          </Message>}
          <Transcript 
            title={ this.props.title } 
            transcript={ transcript }
            transcribing={ transcribing }
            messages={ messages }
          />
        </div>
      </Transition>
    </div>
  }
}