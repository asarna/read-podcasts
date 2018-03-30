import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

export default class Transcript extends React.Component {
  render() {
    return <Segment 
      padded='very'
    >
    <Header as='h3'>{ this.props.title }</Header>
        <p>
          { (this.props.transcript === '')
            ? 'The transcript is processing. This may take a few moments.'
            : this.props.transcript
          }
        </p>
    </Segment>
  }
}