import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Dashboard } from '../../components/dashboard.jsx';

import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});

describe('Dashboard component should', () => {
  it('renders necessary elements if there is no message', () => {
    const wrapper = shallow(<Dashboard group={{}} appNotification={{}} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('p').length).toBe(0);
  });
});

