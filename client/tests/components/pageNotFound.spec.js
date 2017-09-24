import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { shallow } from 'enzyme';

import NotFound from '../../components/PageNotFound.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
global.$ = $;

localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
describe('<NotFound />', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should display the necessary elements', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').exists()).toBe(true);
  });
});
