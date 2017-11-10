import React from 'react';
import { getPodSearch, getEpisodes } from '../helpers/podsearch.js';
import { Button, Input, Grid, Divider, Segment, Transition } from 'semantic-ui-react';
import PodLister from './PodLister.js';

export default class PodPicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			podcasts: [],
			episodes: [],
      error: false,
      showLister: false
		}
		this.search = this.search.bind(this);
		this.listEpisodes = this.listEpisodes.bind(this);
    this.selectEpisode = this.selectEpisode.bind(this);
	}

	search() {
    this.setState({
      error: false,
      showLister: true
    })
    getPodSearch().then((response) => {
      this.setState({
				podcasts: response
			});
    })
  }

  listEpisodes(item) {
    this.props.selectToTranscribe('');
    this.setState({
      error: false
    });
    getEpisodes(item.url)
      .then((response) => {
        this.setState({
          episodes: (response.items.length > 0) ? response.items : [],
          error: !(response.items.length > 0)
        });
      })  
      .catch((error) => {
        this.setState({
          error: true,
          episodes: []
        });
      });
  }

  selectEpisode(item) {
    this.props.selectToTranscribe(item.enclosure.link);
  }

	render() {
		return <div className='pod-picker'>
      <Segment color='olive'>
        <Input 
          type='text' 
          id='search'
          placeholder={ 'Search for a podcast...'}
          fluid
          action={<Button onClick={ this.search }>Search</Button>}
        />
      </Segment>
      
        <Transition 
          animation='fade down'
          duration={500}
          visible={ this.state.showLister }
        >
          <Grid 
            as={Segment} 
            columns={2} 
            divided
          >
    		    <Grid.Column>
    		    	<PodLister 
    		      	items={ this.state.podcasts }
    		      	selectAction={ this.listEpisodes }
    		      />
    		    </Grid.Column>
    		  	<Grid.Column>
    		  		{ this.state.error ?
                <p>Sorry, feed could  not be loaded at this time.</p> :
    		  			<PodLister
    		  				items={ this.state.episodes }
                  selectAction={ this.selectEpisode }
    		  			/>
    		  		}
    		  	</Grid.Column>
    		  </Grid>
          </Transition>
	  </div>
	}
}