import React from 'react';
import { List } from 'semantic-ui-react';
import PodItem from './PodItem.js';

export default class PodLister extends React.Component {

	render() {
		return <List divided relaxed='very' selection> { this.props.items.map((pod) => {
      return <PodItem 
      	item={ pod } 
      	key={ pod.title }
      	selectAction={ this.props.selectAction }
      />
    }) } </List>
	}
}