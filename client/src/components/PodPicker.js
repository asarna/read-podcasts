import React from 'react';
import { getPodSearch, getEpisodes } from '../helpers/podsearch.js';
import { Button, Input, Grid } from 'semantic-ui-react';
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

  listEpisodes(url) {
    this.setState({
      error: false
    });
    getEpisodes(url)
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

	render() {
		return <div>
			<label>Search Podcasts</label>
      <Input type='text' id='search'/>
      <Button onClick={ this.search }>Search</Button>
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
		  			/>
		  		}
		  	</Grid.Column>
  		</Grid>
      
	  </div>
	}
}