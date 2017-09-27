import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { mount } from 'enzyme';

import { SignUp } from '../../components/Signup.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
global.$ = $;

localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    userRegistration: {},
    registerUser: () => Promise.resolve()
  };
  return mount(<SignUp {...props} />);
};
const wrapper = setup();
describe('<SignUp />', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(15);
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
  it('should reset state when componentWillUnmount is called', () => {
    wrapper.instance().componentWillUnmount();
    expect(wrapper.props().userRegistration.reqError).toEqual(null);
    expect(wrapper.props().userRegistration.reqProcessed).toEqual(false);
    expect(wrapper.props().userRegistration.reqProcessing).toEqual(false);
  });
  it('should reset state when registerHandler is executed', () => {
    wrapper.instance().registerHandler({ preventDefault() {} });
    expect(wrapper.state().usernameInput).toEqual('');
    expect(wrapper.state().emailInput).toEqual('');
    expect(wrapper.state().phoneInput).toEqual('');
    expect(wrapper.state().passwordInput).toEqual('');
  });
});
