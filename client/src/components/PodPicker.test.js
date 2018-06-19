import React from 'react';
import ReactDOM from 'react-dom';
import PodPicker from './PodPicker';
import PodLister from './PodLister';
import PodItem from './PodItem';
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
  let el;

  beforeEach(() => {
    el = shallow(<PodPicker
    />);
  });

  it('renders', () => {
    expect(el.length).toEqual(1);
  });

  it('should populate PodLister when search is made', async (done) => {
    el.setState({searchTerm: 'test'});
    await el.instance().handleSearch().then(() => {
      el.update();
      expect(el.find(PodLister).first().props().items).toEqual([{
        title: 'some podcast'
      }]);
      done();
    }); 
  });
});