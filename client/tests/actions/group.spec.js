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
      moxios.stubRequest('/api/v1/group', {
        status: 200,
        response: {
          group: { id: 1, groupMame: 'myGroup' },
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'CREATE_GROUP_BEGINS'
        },
        {
          type: 'CREATE_GROUP_SUCCESSFUL',
          groups: { id: 1, groupMame: 'myGroup' },
        }];
      store.dispatch(GroupActions.createGroup('groupName', 'description', 'groupMembers')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an error", (done) => {
      moxios.stubRequest('/api/v1/group', {
        status: 400,
        response: {
          message: 'Group could not be created'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'CREATE_GROUP_BEGINS'
        },
        {
          type: 'CREATE_GROUP_UNSUCCESSFUL',
          errorMessage: 'Group could not be created'
        }];
      store.dispatch(GroupActions.createGroup('groupName', 'description', 'groupMembers')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Get Groups', () => {
    const user = 'akinoau';
    const offset = 0;
    const limit = 6;
    it('Should make a get request to get all the groups a user belongs to', (done) => {
      moxios.stubRequest(`/api/v1/groups/${user}/${offset}/${limit}`, {
        status: 200,
        response: {
          rows: [{ id: 1, groupName: 'anonymous' }],
          count: 100
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_GROUPS_BEGINS'
        },
        {
          type: 'GeT_GROUPS_SUCCESSFUL',
          groups: [{ id: 1, groupName: 'anonymous' }], pageCount: 100
        }];
      store.dispatch(GroupActions.getGroups()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an error", (done) => {
      moxios.stubRequest('/api/v1/user/2/groups?limit=6&offset=0', {
        status: 400,
        response: {
          message: 'could not get groups',
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_GROUPS_BEGINS'
        },
        {
          type: 'GET_GROUPS_REJECTED',
          errorMessage: 'could not get groups'
        }];
      store.dispatch(GroupActions.getGroups()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an unexpected error", (done) => {
      moxios.stubRequest('/api/v1/user/2/groups?limit=6&offset=0', {
        status: 500
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_GROUPS_REJECTED'
        }];
      store.dispatch(GroupActions.getGroups(2)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});

