import React from 'react';
import ReactDOM from 'react-dom';
import PodPicker from './PodPicker';
import { shallow } from 'enzyme';

describe('PodPicker component', () => {
  it('renders', () => {
    const el = shallow(<PodPicker/>);
    
    expect(el.length).toEqual(1);
  });
});