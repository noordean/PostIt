import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import GroupActions from '../../actions/group';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Group Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create Group', () => {
    it('Should make a post request to create groups', (done) => {
      moxios.stubRequest('https://postit-api.herokuapp.com/api/group', {
        status: 200,
        response: {
          message: 'Group successfully created',
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'CREATE_GROUP_BEGINS'
        },
        {
          type: 'GROUP_CREATED',
          payload:
          {
            message: 'Group successfully created',
          }
        }];
      store.dispatch(GroupActions.createGroup('groupName', 'description', 'groupMembers', 'token')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an unexpected error", (done) => {
      moxios.stubRequest('https://postit-api.herokuapp.com/api/group', {
        status: 400,
        response: {
          message: new Error('Request failed with status code 400')
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'CREATE_GROUP_BEGINS'
        },
        {
          type: 'CREATE_GROUP_REJECTED',
          payload: new Error('Request failed with status code 400')
        }];
      store.dispatch(GroupActions.createGroup('groupName', 'description', 'groupMembers', 'token')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Get Groups', () => {
    const user = 'akinoau';
    const offset = 0;
    const limit = 6;
    it('Should make a get request to get groups a user belongs to', (done) => {
      moxios.stubRequest(`https://postit-api.herokuapp.com/api/groups/${user}/${offset}/${limit}`, {
        status: 200,
        response: {
          message: 'list of groups',
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_GROUPS_BEGINS'
        },
        {
          type: 'G0T_GROUPS',
          payload:
          {
            message: 'list of groups',
          }
        }];
      store.dispatch(GroupActions.getGroups()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an unexpected error", (done) => {
      moxios.stubRequest('https://postit-api.herokuapp.com/api/groups/akinoau/0/6', {
        status: 400,
        response: {
          message: 'unexpected error',
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_GROUPS_BEGINS'
        },
        {
          type: 'GET_GROUPS_REJECTED',
          payload:
          {
            message: 'unexpected error',
          }
        }];
      store.dispatch(GroupActions.getGroups()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
