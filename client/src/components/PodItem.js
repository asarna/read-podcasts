import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default class PodItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { item, item: { title } } = this.props;
		this.props.setActiveItem(title);
		this.props.selectAction(item);
	}

	render() {
		const { item } = this.props;
		return <List.Item 
			onClick={ this.handleClick }
			name={ item.title }
			active={ this.props.active }
		> 
    	<List.Content>
	    	{ (item.logo_url || item.scaled_logo_url) &&
					<Image
						size='tiny'
						floated='left'
						rounded
						src={ item.scaled_logo_url || item.logo_url }
					/>
				}
      	<List.Header>{ item.title.substring(0, 150) }</List.Header>
      	<List.Description>{ item.description && item.description.substring(0, 150) }...</List.Description>
      </List.Content>
    </List.Item>;
	}

}