import React from 'react';
import { podSearch, episodeList } from '../helpers/podsearch.js';
import { Button, Input, Image, Grid } from 'semantic-ui-react';
import PodLister from './PodLister.js';

export default class PodPicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			podcasts: [],
			episodes: []
		}
		this.search = this.search.bind(this);
		this.listEpisodes = this.listEpisodes.bind(this);
	}

	search() {
    podSearch().then((response) => {
      this.setState({
				podcasts: response
			});
    })
  }

  listEpisodes(items) {
  	console.log('listEpisodes was called');
  	this.setState({
  		episodes: items
  	})
  } 

	render() {
		return <div>
			<label>Search Podcasts</label>
      <Input type='text' id='search'/>
      <Button onClick={ this.search }>Search</Button>
      <Grid columns={2} divided>
		    <Grid.Column>
		    	<PodLister 
		      	items={ this.state.podcasts }
		      	listEpisodes={ this.listEpisodes }
		      />
		    </Grid.Column>
		  	<Grid.Column>
		  		{ this.state.error || 
		  			<PodLister
		  				items={ this.state.episodes }
		  			/>
		  		}
		  	</Grid.Column>
  		</Grid>
      
	  </div>
	}
}