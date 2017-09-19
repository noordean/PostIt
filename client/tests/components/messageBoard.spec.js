import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { MessageBoard } from '../../components/MessageBoard.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  id: 1,
  username: 'noordean',
  email: 'ebroyeem90@gmail.com'
});

const setup = () => {
  const props = {
    params: {
      groupID: '',
      groupName: '',
    },
    postGroupMessage: () => {},
    getMessages: () => {},
    saveInAppNotification: () => {},
    archiveReadMessages: () => {},
    sendSmsForNotification: () => {},
    sendMailForNotification: () => {},
    getReadMessageUsers: () => {},
    groupMessages: {},
    readMessages: {},
    member: {}
  };
  return shallow(<MessageBoard {...props} />);
};
const shallowWrapper = setup();

describe('MessageBoard component', () => {
  it('should render neccessary elements', () => {
    expect(shallowWrapper.find('div').length).toBe(14);
    expect(shallowWrapper.find('p').length).toBe(3);
  });
  it('should allow props to be set', () => {
    expect(shallowWrapper.props().params.groupID).toBe(1);
    expect(shallowWrapper.props().params.groupName).toBe('My Group');
  });
});
