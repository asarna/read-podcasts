import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default class PodItem extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { item: { url } } = this.props;
		this.props.selectAction(url);
	}

	render() {
		const { item } = this.props;
		return <List.Item onClick={ this.handleClick }> 
    	<List.Content>
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