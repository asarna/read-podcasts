import React from 'react';
import { Button, Input, Grid, Segment, Transition, Loader, Form } from 'semantic-ui-react';
import PodLister from './PodLister.js';
import axios from 'axios';
import { PodList } from '../models/podList';

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
    const url = `http://gpodder.net/search.json?q=${query}`;

    return axios.get(url).then((response) => {
      let podcastList = new PodList(response.data);

      return podcastList.filterList();
    })
    .catch((error) => {
    	return error;
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
      showLister: true
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
      episodes: []
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

  renderResults() {
    const { podcasts, loadingEpisodes, loadingPods, error, episodes } = this.state;
    return <Segment 
      as={Grid} 
      columns={2} 
      divided
    >
      <Grid.Column>
      { loadingPods && <Loader active /> }
      { podcasts.length === 0 && !loadingPods
        ? <p>No results. Some terms you can try searching for: 'npr' or 'love and radio'.</p>
        : <PodLister 
            items={ podcasts }
            selectAction={ this.listEpisodes }
        />    
      }
      </Grid.Column>
      <Grid.Column>
        { loadingEpisodes && <Loader active /> }
        { error && <p>Sorry, feed could  not be loaded at this time.</p> }
        { episodes.length === 0 && !loadingEpisodes
          ? <p></p>
          : <PodLister
          items={ episodes }
          selectAction={ this.selectEpisode }
        />
        }
      </Grid.Column>
    </Segment>
  }

	render() {
    const { showLister, searchTerm } = this.state;

		return <div className='pod-picker'>
      <Segment color='olive'>
        <Form onSubmit={ this.handleSearch }>
          <Input 
            onChange={ this.setSearchTerm }
            value={ searchTerm }
            type='text' 
            id='search'
            placeholder={ 'Search for a podcast...'}
            fluid
            action={<Button 
              type='submit'
              color='olive'
              >
                Search
              </Button>}
          />
        </Form>
      </Segment>
      <Transition 
        animation='fade down'
        duration={500}
        visible={ showLister }
      >
        { this.renderResults() }
      </Transition>   
	  </div>
	}
}