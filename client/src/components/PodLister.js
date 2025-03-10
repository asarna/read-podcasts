import React from 'react';
import { List, Loader } from 'semantic-ui-react';
import PodItem from './PodItem.js';

export default class PodLister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    };
    this.select = this.select.bind(this);
  }

  setActiveItem(podtitle) {
    this.setState({
      activeItem: podtitle
    });
  }

  select(item) {
    if (this.props.showRightColumn) {
      this.props.showRightColumn();
    };
    this.props.selectAction(item);
  }

  hasResults() {
    const { items } = this.props;
    return !(typeof items === 'undefined' || items.length === 0);
  }

	render() {
		return this.props.loading ? <Loader active /> : <List 
      divided 
      relaxed='very' 
      selection
      className='pod-lister'
    > { this.hasResults() ? this.props.items.map((pod) => {
      return <PodItem 
      	item={ pod } 
      	key={ pod.title }
      	selectAction={ this.select }
        active={ (this.state.activeItem === pod.title) }
        setActiveItem={ this.setActiveItem.bind(this) }
      />
    }) : <p>{ this.props.noResultsMsg }</p> } </List>
	}
}