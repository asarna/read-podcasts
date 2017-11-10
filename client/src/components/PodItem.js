import React from 'react';
import { episodeList } from '../helpers/podsearch.js';
import { List, Image } from 'semantic-ui-react';

export default class PodItem extends React.Component {

	constructor(props) {
		super(props);
		this.info = this.info.bind(this);
	}

	info() {
		const { item: { url } } = this.props;
		episodeList(url)
			.then((response) => {
				console.log('response from info()', response);
				this.props.listEpisodes(response.items);
			})	
			.catch((error) => {
				this.props.listEpisodes('sorry');
			})
	}

	render() {
		const { item } = this.props;
		return <List.Item onClick={ this.info }> 
    	<List.Content floated='right'>
	    	{ item.logo_url &&
					<Image
						size='tiny'
						floated='left'
						rounded
						src={ item.logo_url } 
					/>
				}
      	<List.Header>{ item.title.substring(0, 150) }</List.Header>
      	<List.Description>{ item.description && item.description.substring(0, 150) }...</List.Description>
      </List.Content>
    </List.Item>;
	}

}