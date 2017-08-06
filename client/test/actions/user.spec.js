import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import UserActions from '../../actions/user';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Users Actions', () => {
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
});
