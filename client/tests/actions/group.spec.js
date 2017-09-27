import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';


import GroupActions from '../../actions/GroupActions';

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
      store.dispatch(
        GroupActions.createGroup('groupName', 'description', 'groupMembers'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
    it('Should dispatch appropraite action type if group creation is not successful', (done) => {
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
      store.dispatch(GroupActions.createGroup('groupName',
        'description', 'groupMembers'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
  });

  describe('Get Groups', () => {
    const offset = 0;
    const limit = 1;
    it('Should make a get request to get all the groups a user belongs to',
      (done) => {
        moxios.stubRequest(
          `/api/v1/user/groups?limit=${limit}&offset=${offset}`, {
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
            type: 'GET_GROUPS_SUCCESSFUL',
            groups: [{ id: 1, groupName: 'anonymous' }],
            pageCount: 100
          }];
        store.dispatch(GroupActions.getGroups(1, 0)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(
          `/api/v1/user/groups?limit=${limit}&offset=${offset}`, {
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
            type: 'GET_GROUPS_UNSUCCESSFUL',
            errorMessage: 'could not get groups'
          }];
        store.dispatch(GroupActions.getGroups(1, 0)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
});

