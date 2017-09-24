import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { LoginWithGoogle } from '../../components/GoogleLogin.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
global.$ = $;

localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = (shallowOrMount) => {
  const props = {
    registerGoogleUser: () => Promise.resolve(),
    userFromGoogle: {}
  };
  return shallowOrMount(<LoginWithGoogle {...props} />);
};
const wrapper = setup(shallow);
describe('<LoginWithGoogle />', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(0);
    expect(wrapper.find('div').exists()).toBe(false);
  });
  it('should run responseGoogle when called', () => {
    const spy = sinon.spy(LoginWithGoogle.prototype, 'responseGoogle');
    const newWrapper = setup(shallow);
    newWrapper.instance().responseGoogle({ profileObj: {
      name: 'noordean', email: 'ib@gmail.com' } });
    expect(spy.calledOnce).toBe(true);
  });
});
