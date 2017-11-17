import React from 'react';
import PodPicker from './PodPicker.js';
import Transcriber from './Transcriber.js';
import { Divider, Segment, Transition } from 'semantic-ui-react';

export default class Wrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedEpisode: '',
      showTranscriber: false,
      showPodPicker: true
    };
    this.selectToTranscribe = this.selectToTranscribe.bind(this);
  }

  selectToTranscribe(item) {
    if(item) {
      this.setState({
        selectedEpisode: item.enclosure.link,
        showTranscriber: true,
        episodeTitle: item.title
      })
    } else {
      this.setState({
        selectedEpisode: '',
        showTranscriber: false
      })
    }
  }

  startTranscribing() {
    this.setState({
      showPodPicker: false
    });
  }

  render() {
    return <div>
      <Transition 
        animation='fade down'
        duration={100}
        visible={ this.state.showPodPicker }
      >
        <div>
          <PodPicker 
            selectToTranscribe={ this.selectToTranscribe }
          />
        </div>
      </Transition>
        <Transition
          animation='fade down'
          duration={500}
          visible={ this.state.showTranscriber }
        >
          <div>
            <Transcriber as={Segment}
              title={ this.state.episodeTitle }
              audio={ this.state.selectedEpisode } 
              startTranscribing={ this.startTranscribing.bind(this) }
            />
          </div>
        </Transition>
      
    </div>
  }   
}