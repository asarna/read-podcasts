import React from 'react';
import { Segment } from 'semantic-ui-react';

export default class Transcript extends React.Component {
  render() {
    return <Segment 
      id='output'
      padded='very'
    >The transcript is processing. This may take a few moments.
    </Segment>
  }
}