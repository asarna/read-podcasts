import React from 'react';
import { episodeList } from '../helpers/podsearch.js';
import { List, Image } from 'semantic-ui-react';

export default class PodItem extends React.Component {

	constructor(props) {
		super(props);
		this.info = this.info.bind(this);
		this.update = this.props.update.bind(this);
	}

	info() {
		const { item: { url } } = this.props;
		episodeList(url)
			.then((response) => {
				console.log('items:', response.items)
				this.update(response.items);
			})	
	}

	render() {
		const { item } = this.props;
		return <List.Item onClick={ this.info }> 
			{ item.logo_url &&
				<Image avatar src={ item.logo_url } />
			}
    	<List.Content>
      	<List.Header>{ item.title.substring(0, 150) }</List.Header>
      	<List.Description>{ item.description && item.description.substring(0, 150) }...</List.Description>
      </List.Content>
    </List.Item>;
	}

}