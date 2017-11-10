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
	}

	search() {
    podSearch().then((response) => {
        this.setState({
          data: response
        })
      })
  }

	render() {
		return <div>
			<label>Search Podcasts</label>
      <Input type='text' id='search'/>
      <Button onClick={ this.search }>Search</Button>
      <PodLister items={ this.state.data }/>
	  </div>
	}
}