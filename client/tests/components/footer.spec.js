
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Footer from '../../components/presentation/Footer.jsx';

import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});

describe('Footer component should', () => {
  it('renders necessary elements if there is no message', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').text()).toEqual('© 2017 Copyright noordean');
  });
});
