import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import MessageActions from '../../actions/message';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Message Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Post Message', () => {
    it('Should make a post request to post message', (done) => {
      moxios.stubRequest('/api/v1/group/12/message', {
        status: 200,
        response: {
          Message: { id: 1, groupId: 5, message: 'writing tests' }
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'POST_MESSAGE_BEGINS'
        },
        {
          type: 'POST_MESSAGE_SUCCESSFUL',
          payload: { id: 12, groupId: 8, postedby: 'ibrahim nurudeen', message: 'hi people', priority: 'Normal' }
        }];
      store.dispatch(MessageActions.postGroupMessage(8, 'hi people', 'Normal')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should dispatch appropraite action type if there\'s an error', (done) => {
      moxios.stubRequest('/api/v1/group/12/message', {
        status: 400,
        response: {
          message: 'Could not post message'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'POST_MESSAGE_BEGINS'
        },
        {
          type: 'POST_MESSAGE_UNSUCCESSFUL',
          payload: 'Could not post message'
        }];
      store.dispatch(MessageActions.postGroupMessage(5, 'prioriy', 'Normal')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should dispatch appropraite action type if there\'s an unexpected error', (done) => {
      moxios.stubRequest('/api/v1/group/12/message', {
        status: 500
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'POST_MESSAGE_BEGINS'
        },
        {
          type: 'POST_MESSAGE_REJECTED',
        }];
      store.dispatch(MessageActions.postGroupMessage(5, 'prioriy', 'Normal')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Get Messages', () => {
    it('Should make a request to get messages', (done) => {
      moxios.stubRequest('/api/v1/group/12/message', {
        status: 200,
        response: {
          messages: [{ id: 1, postedby: 'noordean' }]
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_MESSAGES_BEGINS'
        },
        {
          type: 'GET_MESSAGES_SUCCESSFUL',
          payload: { id: 1, groupId: 5, message: 'writing tests' }
        }];
      store.dispatch(MessageActions.postGroupMessage(5, 'prioriy', 'Normal')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should dispatch appropraite action type if there\'s an error', (done) => {
      moxios.stubRequest('/api/v1/group/12/message', {
        status: 400,
        response: {
          message: 'Could not get messages'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_MESSAGE_BEGINS'
        },
        {
          type: 'GET_MESSAGES_UNSUCCESSFUL',
          payload: 'Could not get messages'
        }];
      store.dispatch(MessageActions.getMessages(5, 2)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Create archive Messages', () => {
    it('Should make a request to archive messages', (done) => {
      moxios.stubRequest('/api/v1/group/5/message/archive', {
        status: 201,
        response: {
          message: 'Messages archived'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'ARCHIVE_MESSAGES_SUCCESSFUL',
          message: 'Messages archived'
        }];
      store.dispatch(MessageActions.archiveReadMessages(5, 2, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should dispatch appropraite action type if there\'s an error', (done) => {
      moxios.stubRequest('/api/v1/group/5/message/archive', {
        status: 400,
        response: {
          message: 'Could not get messages'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'ARCHIVE_MESSAGES_UNSUCCESSFUL',
          message: 'Could not get messages'
        }];
      store.dispatch(MessageActions.archiveReadMessages(5, 2), 1).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Get archived Messages', () => {
    it('Should make a request to get archive messages', (done) => {
      moxios.stubRequest('/api/v1/group/5/message/archive?userId=2', {
        status: 200,
        response: {
          messages: [{ id: 1, postedby: 'noordean' }]
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_ARCHIVE_MESSAGES_BEGINS'
        },
        {
          type: 'GET_ARCHIVE_MESSAGES_SUCCESSFUL',
          payload: [{ id: 1, postedby: 'noordean' }]
        }];
      store.dispatch(MessageActions.getArchivedMessages(5, 2)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should dispatch appropraite action type if there\'s an error', (done) => {
      moxios.stubRequest('/api/v1/group/5/message/archive?userId=2', {
        status: 400,
        response: {
          message: 'Could not get messages'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_ARCHIVE_MESSAGES_BEGINS'
        },
        {
          type: 'GET_ARCHIVE_MESSAGES_UNSUCCESSFUL',
          payload: 'Could not get messages'
        }];
      store.dispatch(MessageActions.getArchivedMessages(5, 2)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
