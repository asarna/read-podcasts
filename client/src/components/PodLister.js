import React from 'react';
import { List, Image } from 'semantic-ui-react';
import PodItem from './PodItem.js';

export default class PodLister extends React.Component {

	render() {
		return <List divided relaxed='very' selection> { this.props.items.map((pod) => {
      return <PodItem 
      	item={ pod } 
      	key={ pod.title }
      	update={ this.props.update }
      />
    }) } </List>
	}
}