import React from 'react';
import PodPicker from './PodPicker.js';
import Transcriber from './Transcriber.js';
import { Divider } from 'semantic-ui-react';

export default class Wrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedEpisode: '',
      showTranscriber: false
    }
    this.selectToTranscribe = this.selectToTranscribe.bind(this)
  }

  selectToTranscribe(url) {
    if(url) {
      this.setState({
        selectedEpisode: url,
        showTranscriber: true
      })
    } else {
      this.setState({
        selectedEpisode: '',
        showTranscriber: false
      })
    }
  }

  render() {
    return <div>
      <PodPicker 
        selectToTranscribe={ this.selectToTranscribe }
      />
      <Divider />
      { this.state.showTranscriber && 
        <Transcriber 
          audio={ this.state.episodeSelected }
        /> 
      }
    </div>
  }
}