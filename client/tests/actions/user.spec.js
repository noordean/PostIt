import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import UserActions from '../../actions/user';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Signup Action', () => {
    it('Should make a post request to sign up users', (done) => {
      moxios.stubRequest('/api/v1/user/signup', {
        status: 201,
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
      store.dispatch(UserActions.registerUser('akinoau', 'akin@gmail.com', 'nigeria123', '07045324156')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if invalid username is supplied",
      (done) => {
        moxios.stubRequest('/api/v1/user/signup', {
          status: 400,
          response: {
            message: 'Username should contain only letters'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'REGISTRATION_BEGINS'
          },
          {
            type: 'REGISTRATION_UNSUCCESSFUL',
            payload: {
              message: 'Username should contain only letters'
            }
          }];
        store.dispatch(UserActions.registerUser('akinoau43', 'akin@gmail.com', 'nigeria123', '97856432567')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch appropraite action type if an unexpected error occured",
      (done) => {
        moxios.stubRequest('/api/v1/user/signup', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'REGISTRATION_BEGINS'
          },
          {
            type: 'REGISTRATION_REJECTED',
          }];
        store.dispatch(UserActions.registerUser('akinoau', 'akin@gmail.com', 'nigeria123', '97856432567')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Login Action', () => {
    it('Should make a post request to sign in users', (done) => {
      moxios.stubRequest('/api/V1/user/signin', {
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
    it('Should dispatch appropraite action type if an invalid user tries to sign in',
      (done) => {
        moxios.stubRequest('/api/v1/user/signin', {
          status: 400
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'LOGIN_BEGINS'
          },
          {
            type: 'LOGIN_UNSUCCESSFUL'
          }];
        store.dispatch(UserActions.loginUser('akinoau', 'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch appropraite action type if there's an unexpected error",
      (done) => {
        moxios.stubRequest('/api/v1/user/signin', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'LOGIN_BEGINS'
          },
          {
            type: 'LOGIN_REJECTED'
          }];
        store.dispatch(UserActions.loginUser('akinoau', 'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('getGroupMembers Action', () => {
    it('Should make a get request to get members(users) in a group', (done) => {
      moxios.stubRequest('/api/v1/group/12/users', {
        status: 200,
        response: {
          users: [{ id: 1, username: 'noordean', email: 'ebroyeem90@gmail.com' }]
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GOT_MEMBERS',
          payload: [{ id: 1, username: 'noordean', email: 'ebroyeem90@gmail.com' }]
        }];
      store.dispatch(UserActions.getGroupMembers(12)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should dispatch appropraite action type if there\'s an unexpected error',
      (done) => {
        moxios.stubRequest('/api/v1/group/12/users', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'GET_MEMBERS_REJECTED'
          }];
        store.dispatch(UserActions.getGroupMembers(12)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('addGroupMembers Action', () => {
    it('Should make a request to add members', (done) => {
      moxios.stubRequest('/api/v1/group/12/user', {
        status: 201,
        response: {
          message: 'Users added'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'MEMBERS_ADDED',
          payload: 'Users added'
        }];
      store.dispatch(UserActions.addGroupMembers(12)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch appropraite action type if there's an error", (done) => {
      moxios.stubRequest('/api/v1/group/12/user', {
        status: 500
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'ADD_MEMBERS_REJECTED'
        }];
      store.dispatch(UserActions.addGroupMembers(12)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('sendResetPasswordMail Action', () => {
    it('Should make a request to reset password for a user',
      (done) => {
        moxios.stubRequest('/api/v1/user/reset-password', {
          status: 200,
          response: {
            message: 'A message has been sent to your mail'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'RESET_PASSWORD_BEGINS'
          },
          {
            type: 'RESET_PASSWORD_SUCCESSFUL',
            payload: 'A message has been sent to your mail'
          }];
        store.dispatch(UserActions.sendPasswordResetMail('akin@gmail.com', 'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('Should dispatch appropraite action type if there\'s an error',
      (done) => {
        moxios.stubRequest('/api/v1/user/reset-password', {
          status: 400,
          response: {
            message: 'Could not send mail'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'RESET_PASSWORD_BEGINS'
          },
          {
            type: 'RESET_PASSWORD_UNSUCCESSFUL',
            payload: 'Could not send mail'
          }];
        store.dispatch(UserActions.sendPasswordResetMail('akin@gmail.com', 'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('Should dispatch appropraite action type if there\'s an error',
      (done) => {
        moxios.stubRequest('/api/v1/user/reset-password', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'RESET_PASSWORD_BEGINS'
          },
          {
            type: 'RESET_PASSWORD_REJECTED'
          }];
        store.dispatch(UserActions.sendPasswordResetMail('akin@gmail.com', 'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('verifyPasswordReset Action', () => {
    it('Should make a request to verify the token sent to user\'s email',
      (done) => {
        moxios.stubRequest('/api/v1/user/email/verify', {
          status: 200,
          response: {
            message: 'Token verified'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'VERIFY_PASSWORD_BEGINS'
          },
          {
            type: 'VERIFY_PASSWORD_SUCCESSFUL',
            payload: 'Token verified'
          }];
        store.dispatch(UserActions.verifyPasswordReset('token')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('Should dispatch appropraite action type if there\'s an error',
      (done) => {
        moxios.stubRequest('/api/v1/user/email/verify', {
          status: 401,
          response: {
            message: 'Could not verify token'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'VERIFY_PASSWORD_BEGINS'
          },
          {
            type: 'VERIFY_PASSWORD_UNSUCCESSFUL',
            payload: 'Could not verify token'
          }];
        store.dispatch(UserActions.verifyPasswordReset('token')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an unexpected error',
      (done) => {
        moxios.stubRequest('/api/v1/user/email/verify', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'VERIFY_PASSWORD_BEGINS'
          },
          {
            type: 'VERIFY_PASSWORD_REJECTED'
          }];
        store.dispatch(UserActions.verifyPasswordReset('token')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('registerUserFromGoogle Action', () => {
    it('should make a request to register a user signing up with google account',
      (done) => {
        moxios.stubRequest('/api/v1/user/signup/google', {
          status: 201,
          response: {
            user: { id: 1, username: 'noordean', email: 'ebroyeem90@gmail.com' }
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'REGISTER_GOOGLE_USER_BEGINS'
          },
          {
            type: 'REGISTER_GOOGLE_USER_SUCCESSFUL',
            payload: {
              user: { id: 1, username: 'noordean', email: 'ebroyeem90@gmail.com' }
            }
          }];
        store.dispatch(UserActions.registerUserFromGoogle('username', 'email@gmail.com')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an error',
      (done) => {
        moxios.stubRequest('/api/v1/user/signup/google', {
          status: 409,
          response: {
            message: 'Email already existing',
            user: { id: 1, username: 'existing', email: 'exist90@gmail.com' }
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'REGISTER_GOOGLE_USER_BEGINS'
          },
          {
            type: 'REGISTER_GOOGLE_USER_UNSUCCESSFUL',
            payload: {
              message: 'Email already existing',
              user: { id: 1, username: 'existing', email: 'exist90@gmail.com' }
            }
          }];
        store.dispatch(UserActions.registerUserFromGoogle('username', 'email@gmail.com')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an unexpected error',
      (done) => {
        moxios.stubRequest('/api/v1/user/signup/google', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'REGISTER_GOOGLE_USER_BEGINS'
          },
          {
            type: 'REGISTER_GOOGLE_USER_REJECTED'
          }];
        store.dispatch(UserActions.registerUserFromGoogle('username', 'email@gmail.com')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('sendMailForNotification Action', () => {
    it('should make a request to send mail notification',
      (done) => {
        moxios.stubRequest('/api/v1/users/email', {
          status: 200,
          response: {
            message: 'Mail sent'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'SEND_EMAIL_NOTIFICATION_BEGINS'
          },
          {
            type: 'SEND_EMAIL_NOTIFICATION_SUCCESSFUL',
            payload: 'Mail sent'
          }];
        store.dispatch(UserActions.sendMailForNotification('group@gmail.com', 'group', 'sent it', 'Nurudeen')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an error',
      (done) => {
        moxios.stubRequest('/api/v1/users/email', {
          status: 400,
          response: {
            message: 'Could not send mail'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'SEND_EMAIL_NOTIFICATION_BEGINS'
          },
          {
            type: 'SEND_EMAIL_NOTIFICATION_UNSUCCESSFUL',
            payload: 'Could not send mail'
          }];
        store.dispatch(UserActions.sendMailForNotification('group@gmail.com', 'group', 'sent it', 'Nurudeen')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an unexpected error',
      (done) => {
        moxios.stubRequest('/api/v1/users/email', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'SEND_EMAIL_NOTIFICATION_BEGINS'
          },
          {
            type: 'SEND_EMAIL_NOTIFICATION_REJECTED'
          }];
        store.dispatch(UserActions.sendMailForNotification('group@gmail.com', 'group', 'sent it', 'Nurudeen')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('sendSmsForNotification Action', () => {
    it('should make a request to send sms notification',
      (done) => {
        moxios.stubRequest('/api/v1/users/sms', {
          status: 200,
          response: {
            message: 'Messages sent'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'SEND_SMS_NOTIFICATION_BEGINS'
          },
          {
            type: 'SEND_SMS_NOTIFICATION_SUCCESSFUL',
            payload: 'Messages sent'
          }];
        store.dispatch(UserActions.sendSmsForNotification({ from: 'noordean', to: 'users', message: 'thanks' })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an error',
      (done) => {
        moxios.stubRequest('/api/v1/users/sms', {
          status: 400,
          response: {
            message: 'Could not send message'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'SEND_SMS_NOTIFICATION_BEGINS'
          },
          {
            type: 'SEND_SMS_NOTIFICATION_UNSUCCESSFUL',
            payload: 'Could not send message'
          }];
        store.dispatch(UserActions.sendSmsForNotification({ from: 'noordean', to: 'users', message: 'thanks' })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an unexpected error',
      (done) => {
        moxios.stubRequest('/api/v1/users/sms', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'SEND_SMS_NOTIFICATION_BEGINS'
          },
          {
            type: 'SEND_SMS_NOTIFICATION_REJECTED'
          }];
        store.dispatch(UserActions.sendSmsForNotification({ from: 'noordean', to: 'users', message: 'thanks' })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });

  describe('getReadMessageUsers Action', () => {
    it('should make a request to get those that have read a message',
      (done) => {
        moxios.stubRequest('/api/v1/message/2/user?groupId=12', {
          status: 200,
          response: {
            users: [{id: 1, username: 'noordean'}]
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'GET_READ_USERS_BEGINS'
          },
          {
            type: 'GET_READ_USERS_SUCCESSFUL',
            payload: [{ id: 1, username: 'noordean' }]
          }];
        store.dispatch(UserActions.getReadMessageUsers()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an error', (done) => {
      moxios.stubRequest('/api/v1/message/2/user?groupId=12', {
        status: 200,
        response: {
          users: [{id: 1, username: 'noordean'}]
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_READ_USERS_BEGINS'
        },
        {
          type: 'GET_READ_USERS_UNSUCCESSFUL',
          payload: [{ id: 1, username: 'noordean' }]
        }];
      store.dispatch(UserActions.getReadMessageUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('saveInAppNotification Action', () => {
    it('should make a request to store notifications',
      (done) => {
        moxios.stubRequest('/api/v1/user/notification', {
          status: 200,
          response: {
            message: 'Messages stored'
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'SAVE_NOTIFICATION_SUCCESSFUL',
            payload: 'Messages stored'
          }];
        store.dispatch(UserActions.saveInAppNotification()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an error', (done) => {
      moxios.stubRequest('/api/v1/user/notification', {
        status: 400,
        response: {
          message: 'Could not save notoification'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'SAVE_NOTIFICATION_UNSUCCESSFUL',
          payload: 'Could not save notoification'
        }];
      store.dispatch(UserActions.saveInAppNotification()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('saveInAppNotification Action', () => {
    it('should make a request to store notifications',
      (done) => {
        moxios.stubRequest('/api/v1/user/4/notification', {
          status: 200,
          response: {
            notifications: [{ id: 1, userId: 4, groupId: 5 }]
          }
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'GET_NOTIFICATION_SUCCESSFUL',
            payload: [{ id: 1, userId: 4, groupId: 5 }]
          }];
        store.dispatch(UserActions.getNotifications(4)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('should dispatch appropraite action type if there\'s an error', (done) => {
      moxios.stubRequest('/api/v1/user/4/notification', {
        status: 400
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'GET_NOTIFICATION_UNSUCCESSFUL'
        }];
      store.dispatch(UserActions.getNotifications(4)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
