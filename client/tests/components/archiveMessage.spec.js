import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { ArchiveMessage } from '../../components/archiveMessage.jsx';

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
});
