import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Dashboard } from '../../components/container/Dashboard.jsx';

import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  id: 1,
  username: 'noordean',
  email: 'ebroyeem90@gmail.com'
});

const setup = (shallowOrMount) => {
  const props = {
    group: {
      error: false,
      loading: false,
      pageCount: 3,
      groups: [{ description: 'some description', groupname: 'something' }]
    },
    appNotification: {
      error: false,
      loading: false,
      responseMsg: '',
      notification: [{ groupName: 'Dashboard Group', postedby: 'theOwner' }]
    },
    getGroups: () => Promise.resolve(),
    deleteNotification: () => {},
    getNotifications: () => Promise.resolve()
  };
  return shallowOrMount(<Dashboard {...props} />);
};
const shallowWrapper = setup(mount);

describe('Dashboard component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    expect(shallowWrapper.find('div').length).toBe(4);
    expect(shallowWrapper.find('p').length).toBe(0);
  });
  it('should call componentDidMount', () => {
    sinon.spy(Dashboard.prototype, 'componentDidMount');
    setup(mount);
    expect(Dashboard.prototype.componentDidMount.calledOnce).toBe(true);
  });
  it('should not call handlePageClick', () => {
    sinon.spy(Dashboard.prototype, 'handlePageClick');
    setup(mount);
    expect(Dashboard.prototype.handlePageClick.calledOnce).toBe(false);
  });
  it('should call getNotificationHandler', () => {
    sinon.spy(Dashboard.prototype, 'getNotificationHandler');
    setup(mount);
    expect(Dashboard.prototype.getNotificationHandler.calledOnce).toBe(true);
  });
  it('should allow props to be set', () => {
    const mountWrapper = setup(mount);
    expect(mountWrapper.props().group.pageCount).toBe(3);
    expect(mountWrapper.props().group.loading).toBe(false);
    expect(mountWrapper.props().group.groups[0].description)
      .toBe('some description');
  });
  it('should render groups when state is updated with created groups',
    () => {
      const mountWrapper = setup(mount);
      mountWrapper.setState({
        groups: [{ id: 1, groupname: 'Fengshui', description: 'for sims' }] });
      const eleName = mountWrapper.find('.card-title');
      const eleDesc = mountWrapper.find('.group-desc');
      expect(eleName.text()).toBe('Fengshui');
      expect(eleDesc.text()).toBe('for sims');
    });
  it('should render loading... when props "loading" is true',
    () => {
      const mountWrapper = setup(mount);
      mountWrapper.setProps({ group: {
        groups: [],
        error: false,
        pageCount: 3,
        loading: true
      } });
      const eleLoading = mountWrapper.find('.loading-groups');
      expect(eleLoading.text()).toBe('Loading...');
    });
});

