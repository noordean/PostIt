import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { GuestHeader } from '../../components/GuestHeader.jsx';

import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    sentMail: {},
    sendPasswordResetMail: () => {}
  };
  return mount(<GuestHeader {...props} />);
};
const wrapper = setup();

describe('<GuestHeader />', () => {
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(13);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  it('should call onChange', () => {
    const event = {
      target: {
        name: 'name',
        value: 'value',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
});
