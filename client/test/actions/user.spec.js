/*import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import UserActions from '../../actions/user';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Signup Action', () => {
    it('Should make a post request to sign in users', (done) => {
      moxios.stubRequest('https://postit-api.herokuapp.com/api/user/signup', {
        status: 200,
        response: {
          message: 'Registration successful'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'REGISTRATION_BEGINS'
        },
        {
          type: 'REGISTRATION_SUCCESSFUL',
          payload:
          {
            message: 'Registration successful'
          }
        }];
      store.dispatch(UserActions.registerUser('akinoau', 'akin@gmail.com', 'nigeria123')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an unexpected error",
      (done) => {
        moxios.stubRequest('https://postit-api.herokuapp.com/api/user/signup', {
          status: 400,
          response: {
            message: new Error('Request failed with status code 400')
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'REGISTRATION_BEGINS'
          },
          {
            type: 'REGISTRATION_REJECTED',
            payload: new Error('Request failed with status code 400')
          }];
        store.dispatch(UserActions.registerUser('akinoau', 'akin@gmail.com', 'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('Login Action', () => {
    it('Should make a post request to sign in users', (done) => {
      moxios.stubRequest('https://postit-api.herokuapp.com/api/user/signin', {
        status: 200,
        response: {
          message: 'You are now logged in',
          id: 1513,
          user: 'akinoau',
          email: 'akin@gmail.com',
          token: ''
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'LOGIN_BEGINS'
        },
        {
          type: 'LOGIN_SUCCESSFUL',
          payload:
          {
            message: 'You are now logged in',
            id: 1513,
            user: 'akinoau',
            email: 'akin@gmail.com',
            token: ''
          }
        }];
      store.dispatch(UserActions.loginUser('akinoau', 'nigeria123')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an unexpected error",
      (done) => {
        moxios.stubRequest('https://postit-api.herokuapp.com/api/user/signin', {
          status: 400,
          response: {
            message: new Error('Request failed with status code 400')
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'LOGIN_BEGINS'
          },
          {
            type: 'LOGIN_REJECTED',
            payload: new Error('Request failed with status code 400')
          }];
        store.dispatch(UserActions.loginUser('akinoau', 'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('getGroupMembers Action', () => {
    const groupID = 1513;
    it('Should make a get request to get members(users) in a group', (done) => {
      moxios.stubRequest(`https://postit-api.herokuapp.com/api/group/${groupID}/members`, {
        status: 200,
        response: {
          message: ['list of members'],
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_MEMBERS_BEGINS'
        },
        {
          type: 'GOT_MEMBERS',
          payload:
          {
            message: ['list of groups']
          }
        }];
      store.dispatch(UserActions.getGroupMembers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an unexpected error",
      (done) => {
        moxios.stubRequest(`https://postit-api.herokuapp.com/api/group/${groupID}/members`, {
          status: 400,
          response: {
            message: new Error('Request failed with status code 400')
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'GET_MEMBERS_BEGINS'
          },
          {
            type: 'GET_MEMBERS_REJECTED',
            payload: new Error('Request failed with status code 400')
          }];
        store.dispatch(UserActions.getGroupMembers()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('addGroupMembers Action', () => {
    const groupID = 1513;
    it('Should make a post request to add members(users) to a group', (done) => {
      moxios.stubRequest(`https://postit-api.herokuapp.com/api/group/${groupID}/user`, {
        status: 200,
        response: {
          message: 'Members added successfully'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'ADD_MEMBERS_BEGINS'
        },
        {
          type: 'MEMBERS_ADDED',
          payload:
          {
            message: 'Members added successfully'
          }
        }];
      store.dispatch(UserActions.addGroupMembers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an unexpected error",
      (done) => {
        moxios.stubRequest(`https://postit-api.herokuapp.com/api/group/${groupID}/user`, {
          status: 400,
          response: {
            message: new Error('Request failed with status code 400')
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'ADD_MEMBERS_BEGINS'
          },
          {
            type: 'ADD_MEMBERS_REJECTED',
            payload: new Error('Request failed with status code 400')
          }];
        store.dispatch(UserActions.addGroupMembers()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
});
