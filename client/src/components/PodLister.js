import React from 'react';
import { List } from 'semantic-ui-react';
import PodItem from './PodItem.js';

export default class PodLister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    };
  }

  setActiveItem(podtitle) {
    this.setState({
      activeItem: podtitle
    });
  }

	render() {
		return <List 
      divided 
      relaxed='very' 
      selection
      className='pod-lister'
    > { this.props.items.map((pod) => {
      return <PodItem 
      	item={ pod } 
      	key={ pod.title }
      	selectAction={ this.props.selectAction }
        active={ (this.state.activeItem === pod.title) }
        setActiveItem={ this.setActiveItem.bind(this) }
      />
    }) } </List>
	}
}