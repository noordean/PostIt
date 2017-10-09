import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { shallow } from 'enzyme';

import { MessageBoard } from '../../components/container/MessageBoard.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
global.$ = $;

localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    params: {
      groupId: '',
      groupName: ''
    },
    getMessages: () => Promise.resolve(),
    postMessage: () => {},
    saveInAppNotification: () => {},
    archiveReadMessages: () => {},
    smsNotification: () => {},
    mailNotification: () => {},
    getReadMessageUsers: () => {},
    groupMessages: {},
    readMessages: {},
    member: {}
  };
  return shallow(<MessageBoard {...props} />);
};
const wrapper = setup();
describe('<MessageBoard />', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  it('should update state when componentDidMount is called', () => {
    wrapper.instance().componentDidMount();
    expect(wrapper.state().messages.length).toEqual(0);
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
  it('should update state when componentWillReceiveProps is called', () => {
    wrapper.instance().componentWillReceiveProps({
      groupMessages: {
        messages: [{ id: 1, message: 'Hi people' }],
        responseMsg: '' },
      readMessages: { users: [{ id: 1, username: 'noordean' }] }
    });
    expect(wrapper.state().messages.length).toEqual(1);
    expect(wrapper.state().messages[0].message).toEqual('Hi people');
    expect(wrapper.state().responseMsg).toEqual('');
    expect(wrapper.state().readMessageUsers.length).toEqual(1);
    expect(wrapper.state().readMessageUsers[0].username).toEqual('noordean');
  });
  it('should update msgStatus in the state when getMsgStatus is called', () => {
    const event = {
      target: {
        value: 'Urgent',
      }
    };
    wrapper.instance().getMsgStatus(event);
    expect(wrapper.state().msgStatus).toEqual('Urgent');
  });
  it('should not update state when archiveMessageHandler is called', () => {
    wrapper.instance().archiveMessageHandler();
    expect(wrapper.state().messages.length).toEqual(1);
  });
  it('should reset messageInput and msgStatus when clearPostMessageState is called',
    () => {
      wrapper.instance().clearPostMessageState();
      expect(wrapper.state().messageInput).toEqual('');
      expect(wrapper.state().msgStatus).toEqual('Normal');
    });
  it('should update state when postMessageHandler is called', () => {
    wrapper.instance().postMessageHandler({ preventDefault() {} });
    expect(wrapper.state().msgStatus).toEqual('Normal');
  });
  it('should not update state when sendMailNotification is called', () => {
    wrapper.instance().sendMailNotification([{
      id: 1, email: 'ib@g.com' }], 'Hi guyz');
    expect(wrapper.state().msgStatus).toEqual('Normal');
  });
});
