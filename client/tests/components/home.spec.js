
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Home from '../../components/presentation/home.jsx';

import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});

describe('Footer component should', () => {
  it('renders necessary elements if there is no message', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div').length).toBe(0);
  });
});
