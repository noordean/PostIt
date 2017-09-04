import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { ArchiveMessage } from '../../components/archiveMessage.jsx';

import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
localStorageMock.user = JSON.stringify({
  user: 'noordean',
  email: 'ebroyeem90@gmail.com'
});
const setup = () => {
  const props = {
    archivedMessages: {},
    getArchivedMessages: () => {}
  };
  return shallow(<ArchiveMessage {...props} />);
};
const wrapper = setup();

describe('<ArchiveMessage />', () => {
  describe('when a component is rendered', () => {
    it('should display the necessary elements', () => {
      expect(wrapper.find('div').length).toBe(2);
      expect(wrapper.find('div').exists()).toBe(true);
    });
  });
});
