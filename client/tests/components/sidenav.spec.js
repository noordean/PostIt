import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { SideNav } from '../../components/Sidenav.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
global.$ = () => ({
  modal: () => null,
  sideNav: () => null,
  collapsible: () => null,
  dropdown: () => null,
  val: () => null,
});
const setup = (shallowOrMount) => {
  const props = {
    groupId: '',
    groupName: '',
    addGroupMembers: () => {},
    getGroupMembers: () => {},
    member: {}
  };
  return shallowOrMount(<SideNav {...props} />);
};
const wrapper = setup(mount);
describe('<SideNav />', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  it('should update state when componentWillReceiveProps is called', () => {
    wrapper.instance().componentWillReceiveProps({
      member: { members: [{ id: 1, username: 'noordean' }], responseMsg: '' }
    });
    expect(wrapper.state().groupMembers.length).toEqual(1);
    expect(wrapper.state().groupMembers[0]).toEqual('noordean');
    expect(wrapper.state().responseMsg).toEqual('');
  });
  it('should run clearAddMembersState when called', () => {
    const spy = sinon.spy(SideNav.prototype, 'clearAddMembersState');
    wrapper.instance().clearAddMembersState();
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.find('#getChips').text()).toEqual('');
  });
  it('should run openAddMembers when called', () => {
    const spy = sinon.spy(SideNav.prototype, 'openAddMembers');
    const newWrapper = setup(mount);
    newWrapper.instance().openAddMembers({ preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });
});
