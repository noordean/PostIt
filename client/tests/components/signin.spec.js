import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { shallow } from 'enzyme';

import { SignIn } from '../../components/container/Signin.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
global.$ = $;

localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    loginUser: () => Promise.resolve(),
    userLogin: {}
  };
  return shallow(<SignIn {...props} />);
};
const wrapper = setup();
describe('<SignIn />', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
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
  it('should reset state when loginHandler is called', () => {
    wrapper.instance().loginHandler({ preventDefault() {} });
    expect(wrapper.state().usernameInput).toEqual('');
    expect(wrapper.state().passwordInput).toEqual('');
  });
});
