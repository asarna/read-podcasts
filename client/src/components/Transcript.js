import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

export default class Transcript extends React.Component {
  render() {
    return <Segment 
      padded='very'
      id='transcript'
    >
    <Header as='h3'>{ this.props.title }</Header>
        <p id='output'>
            The transcript is processing. This may take a few moments.
        </p>
    </Segment>
  }
}