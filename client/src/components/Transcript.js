import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

export default class Transcript extends React.Component {
  render() {
    const { transcript, transcribing, title } = this.props;

    return <Segment 
      padded='very'
      className='transcript'
    >
    <Header as='h3'>{ title }</Header>
      <p>
        { (transcript === '')
          ? <em>The transcript is processing. This may take a few moments.</em>
          : transcript
        }
        { transcribing && <Icon loading name='spinner' /> }
      </p>
    </Segment>
  }
}