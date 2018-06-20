import React from 'react';
import { Grid, Segment, Transition, Menu, Responsive, Icon } from 'semantic-ui-react';

export default class ResponsiveColumns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRight: false
    }
    this.handleBackArrow = this.handleBackArrow.bind(this);
    this.showRightColumn = this.showRightColumn.bind(this);
  }

  showRightColumn() {
    this.setState({
      showRight: true
    });
  }

  handleBackArrow() {
    this.setState({
      showRight: false
    })
  }
  
  render() {
    const { showRight } = this.state;

    return <div>
      { showRight && <Responsive 
        as={ Menu } 
        attached='top' 
        maxWidth={Responsive.onlyTablet.maxWidth} 
        secondary
      >
        <Menu.Item
          onClick={ this.handleBackArrow }
        >
          <Icon name='arrow left' />
        </Menu.Item>
      </Responsive>}
      <Segment attached>
        <Grid
            columns={ showRight ? 2 : 1 } 
            divided
            stretched
            doubling
        >
          <Grid.Column
            only={ showRight && 'computer'}
          >
            {this.props.left({showRightColumn: this.showRightColumn})}
          </Grid.Column>
          { showRight && <Grid.Column>
            {this.props.right()}
          </Grid.Column>}
        </Grid>
      </Segment>
    </div>
  }
}