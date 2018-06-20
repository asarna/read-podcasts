import React from 'react';
import { Grid, Segment, Transition, Menu, Responsive, Icon } from 'semantic-ui-react';
import PodLister from './PodLister';
import axios from 'axios';
import { PodList } from '../models/podList';
import Search from './Search';
import ResponsiveColumns from './ResponsiveColumns';

export default class PodPicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			podcasts: [],
			episodes: [],
      error: false,
      showLister: false,
      loadingPods: false,
      loadingEpisodes: false,
      searchTerm: ''
		}
		this.handleSearch = this.handleSearch.bind(this);
		this.listEpisodes = this.listEpisodes.bind(this);
    this.selectEpisode = this.selectEpisode.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }
  
  setSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  podSearch(query) {
    const url = `https://gpodder.net/search.json?q=${query}`;

    return axios.get(url).then((response) => {
      let podcastList = new PodList(response.data);

      return podcastList.filterList();
    })
    .catch((error) => {
    	this.setState({
        loadingPods: false,
        error: true
      });
    });
  };

  getEpisodes(feedUrl) {
    const feedUrlEncoded = encodeURIComponent(feedUrl);
    return axios.get(`/episodes/${feedUrlEncoded}`).then((response) => {
      return response.data;
    });
  }

	handleSearch() {
    this.setState({
      error: false,
      loadingPods: true,
      loadingEpisodes: false,
      podcasts: [],
      episodes: [],
      showLister: true,
    });
    return this.podSearch(this.state.searchTerm).then((response) => {
      this.setState({
				podcasts: response,
        loadingPods: false
			});
    }).catch((error) => {
      this.setState({
        loadingPods: false,
        error: true
      });
    })
  }

  listEpisodes(item) {
    this.props.selectToTranscribe('');
    this.setState({
      error: false,
      loadingEpisodes: true,
      episodes: [],
    });
    this.getEpisodes(item.url)
      .then((response) => {
        this.setState({
          episodes: (response.items.length > 0) ? response.items : [],
          error: !(response.items.length > 0),
          loadingEpisodes: false
        });
      })  
      .catch((error) => {
        this.setState({
          error: true,
          episodes: [],
          loadingEpisodes: false
        });
      });
  }

  selectEpisode(item) {
    this.props.selectToTranscribe(item);
  }

  renderPodcasts(someprops) {
    const { podcasts, loadingEpisodes, loadingPods } = this.state;
    return <PodLister
      loading={ loadingPods }
      items={ podcasts }
      selectAction={ this.listEpisodes }
      noResultsMsg={ "No results. Some terms you can try search for: 'npr' or 'love and radio'." }
      { ...someprops }
    />
  }

  renderEpisodes() {
    const { loadingEpisodes, episodes, error } = this.state;
    return <PodLister 
      loading={ loadingEpisodes }
      items={ episodes }
      selectAction={ this.selectEpisode }
      noResultsMsg={ error && "Sorry, feed could not be loaded at this time." }
    />
  }

	render() {
    const { showLister, searchTerm } = this.state;

		return <div className='pod-picker'>
      <Search
        handleSearch={ this.handleSearch }
        setSearchTerm={this.setSearchTerm}
        searchTerm={searchTerm}
      />
      <Transition 
        animation='fade down'
        duration={500}
        visible={ showLister }
      >
        <ResponsiveColumns 
          left={ this.renderPodcasts.bind(this) }
          right={ this.renderEpisodes.bind(this) }
        />
      </Transition>   
	  </div>
	}
}