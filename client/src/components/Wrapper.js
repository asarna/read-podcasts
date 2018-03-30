import React from 'react';
import PodPicker from './PodPicker.js';
import Transcriber from './Transcriber.js';
import { Segment, Transition } from 'semantic-ui-react';

export default class Wrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedEpisode: '',
      showTranscriber: false,
      showPodPicker: true
    };
    this.selectToTranscribe = this.selectToTranscribe.bind(this);
    this.setWrapperState = this.setWrapperState.bind(this);
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

  setWrapperState(stateObj) {
    this.setState(stateObj);
  }

  render() {
    const { showPodPicker, showTranscriber, episodeTitle, selectedEpisode } = this.state;
    return <div>
      <Transition 
        animation='fade down'
        duration={100}
        visible={ showPodPicker }
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
          visible={ showTranscriber }
        >
          <div>
            <Transcriber as={Segment}
              title={ episodeTitle }
              audio={ selectedEpisode } 
              setWrapperState={ this.setWrapperState }
            />
          </div>
        </Transition>
      
    </div>
  }   
}