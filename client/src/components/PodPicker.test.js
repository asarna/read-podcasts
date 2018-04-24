import React from 'react';
import ReactDOM from 'react-dom';
import PodPicker from './PodPicker';
import PodLister from './PodLister';
import { shallow } from 'enzyme';
import axios from 'axios';

jest.mock('axios', () => {
  const exampleData = {
    data: [{ title: 'some podcast'}]
  };
  
  return {
    get: jest.fn(() => Promise.resolve(exampleData)),
  };
});


describe('PodPicker component', () => {
  const el = shallow(<PodPicker/>);

  it('renders', () => {
    expect(el.length).toEqual(1);
  });

  it('should not render PodLister', () => {
    expect(el.find(PodLister).length).toEqual(0);
  });

  it('should show PodLister when search is made', async (done) => {
    el.setState({searchTerm: 'test'});
    await el.instance().handleSearch().then(() => {
      el.update();
      expect(el.find(PodLister).length).toEqual(1);
      expect(el.find(PodLister).props().items).toEqual([{
        title: 'some podcast'
      }]);
      done();
    }); 
  })
});