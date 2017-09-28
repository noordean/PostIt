import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { ArchiveMessage } from '../../components/container/ArchiveMessage.jsx';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    params: { groupId: '' },
    archivedMessages: {},
    getArchivedMessages: () => {}
  };
  return mount(<ArchiveMessage {...props} />);
};
const wrapper = setup();

describe('<ArchiveMessage />', () => {
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  it('should call componentDidMount', () => {
    sinon.spy(ArchiveMessage.prototype, 'componentDidMount');
    setup();
    expect(ArchiveMessage.prototype.componentDidMount.calledOnce).toBe(true);
  });
  it('should render messages when state is updated with archived messages',
    () => {
      wrapper.setState({
        messages: [{ id: 1, message: 'Hi guyz', postedby: 'Nurudeen' }] });
      const eleName = wrapper.find('.media-heading');
      const eleMsg = wrapper.find('.msgTxt');
      expect(eleName.text()).toBe('Nurudeen');
      expect(eleMsg.text()).toBe('Hi guyz');
    });
  it('should render an error message when state is updated with error message',
    () => {
      wrapper.setState({
        responseMsg: 'An unexpected error occurred' });
      const eleError = wrapper.find('.error-message');
      expect(eleError.text()).toBe('An unexpected error occurred');
    });
  it('should render loading... when props "loading" is true',
    () => {
      wrapper.setProps({ archivedMessages: {
        messages: [],
        responseMsg: '',
        loading: true
      } });
      const eleLoading = wrapper.find('.loading-messages');
      expect(eleLoading.text()).toBe('Loading messages...');
    });
});
