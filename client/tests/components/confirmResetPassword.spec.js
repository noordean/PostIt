import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { ConfirmResetPassword } from '../../components/ConfirmResetPassword.jsx';

import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    params: { token: '' },
    verifyPassword: () => {},
    verifyMailUrl: {}
  };
  return mount(<ConfirmResetPassword {...props} />);
};
const wrapper = setup();

describe('<ConfirmResetPassword />', () => {
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  it('should call componentWillMount', () => {
    sinon.spy(ConfirmResetPassword.prototype, 'componentWillMount');
    setup(mount);
    expect(ConfirmResetPassword.prototype.componentWillMount.calledOnce)
      .toBe(true);
  });
  it('should render a success message if password is successfully changed',
    () => {
      wrapper.setState({
        responseMsg: 'success' });
      const eleSuccess = wrapper.find('.success-message');
      expect(eleSuccess.text()).toBe(
        'Password successfully changed. You can now clickhere to login');
    });
});
