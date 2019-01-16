import React from 'react';
import { Button, Input, Segment, Form } from 'semantic-ui-react';

export default class Search extends React.Component {

  render() {
    const { handleSearch, setSearchTerm, searchTerm } = this.props;

    return <Segment color='olive'>
    <Form onSubmit={ handleSearch }>
      <Input 
        onChange={ setSearchTerm }
        value={ searchTerm }
        type='text' 
        id='search'
        // placeholder={ 'Search for a podcast...'}
        fluid
        action={<Button 
          type='submit'
          color='olive'
          >
            Search
          </Button>}
      />
    </Form>
  </Segment>
  }
}