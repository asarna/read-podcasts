import React from 'react';
import { podSearch } from '../helpers/podsearch.js';
import { Button, Input, Image } from 'semantic-ui-react';
import PodLister from './PodLister.js';

export default class PodPicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.search = this.search.bind(this);
		this.updateList = this.updateList.bind(this);
	}

	updateList(data) {
		console.log('updateList was called');
		this.setState({
			data: data
		});
		console.log('podpicker state', this.state);
	}
	search() {
    podSearch().then((response) => {
      this.updateList(response);
    });
  }

	render() {
		console.log('podpicker re-rendered');
		return <div>
			<label>Search Podcasts</label>
      <Input type='text' id='search'/>
      <Button onClick={ this.search }>Search</Button>
      <PodLister 
      	items={ this.state.data }
      	update={ this.updateList }
      />
	  </div>
	}
}