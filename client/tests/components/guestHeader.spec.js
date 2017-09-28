import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { GuestHeader } from '../../components/container/GuestHeader.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    sentMail: {},
    mailPassword: () => Promise.resolve()
  };
  return mount(<GuestHeader {...props} />);
};
const wrapper = setup();
describe('<GuestHeader />', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(12);
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
  it('should run clearResetPasswordState when called and then reset state',
    () => {
      const spy = sinon.spy(GuestHeader.prototype, 'clearResetPasswordState');
      wrapper.instance().clearResetPasswordState();
      expect(spy.calledOnce).toBe(true);
      expect(wrapper.state().email).toEqual('');
      expect(wrapper.state().password).toEqual('');
      expect(wrapper.state().confirmPassword).toEqual('');
    });
  it('should run submitResetPassword when called and then reset state', () => {
    const spy = sinon.spy(GuestHeader.prototype, 'submitResetPassword');
    const newWrapper = setup();
    newWrapper.instance().submitResetPassword({ preventDefault() {} });
    expect(spy.calledOnce).toBe(true);
    expect(newWrapper.state().email).toEqual('');
    expect(newWrapper.state().password).toEqual('');
    expect(newWrapper.state().confirmPassword).toEqual('');
  });
});
