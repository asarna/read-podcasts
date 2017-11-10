import React from 'react';
import { getPodSearch, getEpisodes } from '../helpers/podsearch.js';
import { Button, Input, Grid, Divider } from 'semantic-ui-react';
import PodLister from './PodLister.js';

export default class PodPicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			podcasts: [],
			episodes: [],
      error: false
		}
		this.search = this.search.bind(this);
		this.listEpisodes = this.listEpisodes.bind(this);
	}

	search() {
    this.setState({
      error: false
    })
    getPodSearch().then((response) => {
      this.setState({
				podcasts: response
			});
    })
  }

  listEpisodes(item) {
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
    console.log('episode selected:', item.enclosure.link);
  }

	render() {
		return <div className='pod-picker'>
      <Input 
        type='text' 
        id='search'
        placeholder={ 'Search for a podcast...'}
        fluid
        action={<Button onClick={ this.search }>Search</Button>}
      />
      <Divider />
      <Grid columns={2} divided>
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
      
	  </div>
	}
}