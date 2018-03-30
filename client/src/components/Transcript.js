import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

export default class Transcript extends React.Component {
  render() {
    return <Segment 
      padded='very'
    >
    <Header as='h3'>{ this.props.title }</Header>
      <p>
        { (this.props.transcript === '')
          ? <em>The transcript is processing. This may take a few moments.</em>
          : this.props.transcript
        }
        {this.props.transcribing && <Icon loading name='spinner' />}
      </p>
    </Segment>
  }
}