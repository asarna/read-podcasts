import React from 'react';
import ReactDOM from 'react-dom';
import PodPicker from './PodPicker';
import PodLister from './PodLister';
import { shallow } from 'enzyme';

describe('PodPicker component', () => {
  const el = shallow(<PodPicker/>);

  it('renders', () => {
    expect(el.length).toEqual(1);
  });

  it('should not render PodLister', () => {
    expect(el.find(PodLister).length).toEqual(0);
  });
});