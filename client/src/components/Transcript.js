import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

// export default class Transcript extends React.Component {
//   render() {
//     const { transcript, transcribing, title } = this.props;

//     return <Segment 
//       padded='very'
//       className='transcript'
//     >
//     <Header as='h3'>{ title }</Header>
//       <p>
//         { (transcript === '')
//           ? <em>The transcript is processing. This may take a few moments.</em>
//           : transcript
//         }
//         { transcribing && <Icon loading name='spinner' /> }
//       </p>
//     </Segment>
//   }
// }

const Transcript = (props) => {

    const results = props.messages.map(msg =>
      // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
      // The result_index is for the first result in the message,
      // so we need to count up from there to calculate the key.

      // resultsBySpeaker/SpeakerStream sets each results.speaker value once it is known,
      // but can also return results without any speaker set if the speakerlessInterim flag
      // is set (for faster UI updates).
      msg.results.map((result, i) => (
        <div key={`result-${msg.result_index + i}`}>
          <dt>{typeof result.speaker === 'number'
            ? `Speaker ${result.speaker}: `
            : '(Detecting speakers): '}</dt>
          <dd>{result.alternatives[0].transcript}</dd>
        </div>
      ))).reduce((a, b) => a.concat(b), []); // the reduce() call flattens the array
    return (
      <div className="speaker-labels">
        {results}
      </div>
    );
}

export default Transcript;