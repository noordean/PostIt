import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Header } from '../../components/container/Header.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
global.$ = $;
global.$ = () => ({
  modal: () => null,
  sideNav: () => null,
  collapsible: () => null,
  dropdown: () => null,
  val: () => null,
});
const setup = () => {
  const props = {
    createGroup: () => Promise.resolve(),
    getGroups: () => Promise.resolve(),
    group: {}
  };
  return mount(<Header {...props} />);
};
const wrapper = setup();
describe('<Header />', () => {
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
  it('should run createGroup when called', () => {
    const spy = sinon.spy(Header.prototype, 'createGroup');
    const newWrapper = setup();
    newWrapper.instance().createGroup({ preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });
  it('should run clearCreateGroupState when called', () => {
    const spy = sinon.spy(Header.prototype, 'clearCreateGroupState');
    wrapper.instance().clearCreateGroupState();
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.state().groupName).toEqual('');
    expect(wrapper.state().groupDescription).toEqual('');
  });
  it('should run openCreateGroupModal when called', () => {
    const spy = sinon.spy(Header.prototype, 'openCreateGroupModal');
    const newWrapper = setup();
    newWrapper.instance().openCreateGroupModal({ preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });
});
