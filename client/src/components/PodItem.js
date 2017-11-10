import React from 'react';
import { podInfo } from '../helpers/podsearch.js';
import { List, Image } from 'semantic-ui-react';

export default class PodItem extends React.Component {

	info() {
		const { item: { url } } = this.props;
		podInfo(url);
	}

	render() {
		const { item } = this.props;
		return <List.Item onClick={ this.info.bind(this) }> 
    	<Image avatar src={ item.scaled_logo_url } />
    	<List.Content>
      	<List.Header>{ item.title.substring(0, 150) }</List.Header>
      	<List.Description>{ item.description.substring(0, 150) }...</List.Description>
      </List.Content>
    </List.Item>;
	}

}