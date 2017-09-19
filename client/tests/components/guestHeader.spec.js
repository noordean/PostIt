import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import $ from 'jquery';

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
  it('should call openPasswordReset() when .reset-pass btn is clicked', () => {
    const spy = sinon.spy();
    GuestHeader.prototype.openPasswordReset = spy;
    const shallowWrapper = shallow(<GuestHeader sentMail={{}} sendPasswordResetMail={() => {}} />);
    shallowWrapper.find('.reset-pass').simulate('click');
    expect(spy.calledOnce).toBe(true);
  });
  it('should contain neccessary states', () => {
    const shallowWrapper = shallow(<GuestHeader sentMail={{}} sendPasswordResetMail={() => {}} />);
    const responseMsg = shallowWrapper.state().responseMsg;
    expect(responseMsg).toBe('');
  });
});
