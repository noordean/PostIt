import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Dashboard } from '../../components/Dashboard.jsx';

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
    expect(shallowWrapper.find('div').length).toBe(6);
    expect(shallowWrapper.find('p').length).toBe(1);
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
    expect(mountWrapper.props().group.groups[0].description).toBe('some description');
  });
});

