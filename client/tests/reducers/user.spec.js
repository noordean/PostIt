import expect from 'expect';

import UserReducers from '../../reducers/user';

const initialState = {
  reqStatus: {},
  reqError: false,
  loading: false
};

const memberInitialState = { members: [], responseMsg: '', reqError: false };
const passwordResetInitialState = { responseMsg: '', loading: false, error: false };
const googleUserInitialState = { response: [], loading: false, error: false };
const readMessagesInitial = { users: [], loading: false, error: false };
const notificationInitial = { notification: [], loading: false, error: false, responseMsg: '' };

describe('User Reducer', () => {
  it('should update the state when REGISTRATION_SUCCESSFUL is passed', () => {
    const action = {
      type: 'REGISTRATION_SUCCESSFUL', payload: { message: 'Registration successful' }
    };
    const expected = {
      reqStatus: { message: 'Registration successful' },
      reqError: false,
      loading: false
    };
    const newState = UserReducers.register(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTRATION_BEGINS is passed', () => {
    const action = {
      type: 'REGISTRATION_BEGINS'
    };
    const expected = {
      reqStatus: {},
      reqError: false,
      loading: true
    };
    const newState = UserReducers.register(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTRATION_REJECTED is passed', () => {
    const action = {
      type: 'REGISTRATION_REJECTED', payload: new Error()
    };
    const expected = {
      reqStatus: {},
      reqError: true,
      loading: false
    };
    const newState = UserReducers.register(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when LOGIN_SUCCESSFUL is passed', () => {
    const action = {
      type: 'LOGIN_SUCCESSFUL', payload: { message: 'You are now logged in' }
    };
    const expected = {
      reqStatus: { message: 'You are now logged in' },
      reqError: false,
      loading: false
    };
    const newState = UserReducers.login(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when LOGIN_BEGINS is passed', () => {
    const action = {
      type: 'LOGIN_BEGINS'
    };
    const expected = {
      reqStatus: {},
      reqError: false,
      loading: true
    };
    const newState = UserReducers.login(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when LOGIN_REJECTED is passed', () => {
    const action = {
      type: 'LOGIN_REJECTED', payload: new Error()
    };
    const expected = {
      reqStatus: {},
      reqError: true,
      loading: false
    };
    const newState = UserReducers.login(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when ADD_MEMBERS_REJECTED is passed', () => {
    const action = {
      type: 'ADD_MEMBERS_REJECTED'
    };
    const expected = {
      members: [],
      reqError: true,
      responseMsg: ''
    };
    const newState = UserReducers.groupMembers(memberInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GOT_MEMBERS is passed', () => {
    const action = {
      type: 'GOT_MEMBERS', payload: [{ id: 1, username: 'nuru', email: 'ebroyeem@gmail.com' }]
    };
    const expected = {
      members: [{ id: 1, username: 'nuru', email: 'ebroyeem@gmail.com' }],
      reqError: false,
      responseMsg: ''
    };
    const newState = UserReducers.groupMembers(memberInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MEMBERS_FAILED is passed', () => {
    const action = {
      type: 'GET_MEMBERS_FAILED', payload: 'could not get members'
    };
    const expected = {
      members: [],
      reqError: false,
      responseMsg: 'could not get members'
    };
    const newState = UserReducers.groupMembers(memberInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when ADD_MEMBERS_FAILED is passed', () => {
    const action = {
      type: 'ADD_MEMBERS_FAILED', payload: 'could not add members'
    };
    const expected = {
      members: [],
      reqError: false,
      responseMsg: 'could not add members'
    };
    const newState = UserReducers.groupMembers(memberInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MEMBERS_REJECTED is passed', () => {
    const action = {
      type: 'GET_MEMBERS_REJECTED'
    };
    const expected = {
      members: [],
      reqError: true,
      responseMsg: ''
    };
    const newState = UserReducers.groupMembers(memberInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when RESET_PASSWORD_BEGINS is passed', () => {
    const action = {
      type: 'RESET_PASSWORD_BEGINS'
    };
    const expected = { responseMsg: '', loading: true, error: false };
    const newState = UserReducers.sendPasswordResetMail(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when RESET_PASSWORD_SUCCESSFUL is passed', () => {
    const action = {
      type: 'RESET_PASSWORD_SUCCESSFUL', payload: 'Message sent'
    };
    const expected = { responseMsg: 'Message sent', loading: false, error: false };
    const newState = UserReducers.sendPasswordResetMail(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when RESET_PASSWORD_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'RESET_PASSWORD_UNSUCCESSFUL', payload: 'Could not send message'
    };
    const expected = { responseMsg: 'Could not send message', loading: false, error: false };
    const newState = UserReducers.sendPasswordResetMail(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when RESET_PASSWORD_REJECTED is passed', () => {
    const action = {
      type: 'RESET_PASSWORD_REJECTED'
    };
    const expected = { responseMsg: '', loading: false, error: true };
    const newState = UserReducers.sendPasswordResetMail(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when VERIFY_PASSWORD_BEGINS is passed', () => {
    const action = {
      type: 'VERIFY_PASSWORD_BEGINS'
    };
    const expected = { responseMsg: '', loading: true, error: false };
    const newState = UserReducers.verifyPasswordReset(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when VERIFY_PASSWORD_SUCCESSFUL is passed', () => {
    const action = {
      type: 'VERIFY_PASSWORD_SUCCESSFUL', payload: 'Password verified'
    };
    const expected = { responseMsg: 'Password verified', loading: false, error: false };
    const newState = UserReducers.verifyPasswordReset(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when VERIFY_PASSWORD_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'VERIFY_PASSWORD_UNSUCCESSFUL', payload: 'Password could not be verified'
    };
    const expected = { responseMsg: 'Password could not be verified', loading: false, error: false };
    const newState = UserReducers.verifyPasswordReset(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when VERIFY_PASSWORD_REJECTED is passed', () => {
    const action = {
      type: 'VERIFY_PASSWORD_REJECTED'
    };
    const expected = { responseMsg: '', loading: false, error: true };
    const newState = UserReducers.verifyPasswordReset(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SEND_EMAIL_NOTIFICATION_BEGINS is passed', () => {
    const action = {
      type: 'SEND_EMAIL_NOTIFICATION_BEGINS'
    };
    const expected = { responseMsg: '', loading: true, error: false };
    const newState = UserReducers.sendMailForNotification(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SEND_EMAIL_NOTIFICATION_SUCCESSFUL is passed', () => {
    const action = {
      type: 'SEND_EMAIL_NOTIFICATION_SUCCESSFUL', payload: 'Email sent'
    };
    const expected = { responseMsg: 'Email sent', loading: false, error: false };
    const newState = UserReducers.sendMailForNotification(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SEND_EMAIL_NOTIFICATION_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'SEND_EMAIL_NOTIFICATION_UNSUCCESSFUL', payload: 'Email could not be sent'
    };
    const expected = { responseMsg: 'Email could not be sent', loading: false, error: false };
    const newState = UserReducers.sendMailForNotification(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SEND_EMAIL_NOTIFICATION_REJECTED is passed', () => {
    const action = {
      type: 'SEND_EMAIL_NOTIFICATION_REJECTED'
    };
    const expected = { responseMsg: '', loading: false, error: true };
    const newState = UserReducers.sendMailForNotification(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SEND_SMS_NOTIFICATION_SUCCESSFUL is passed', () => {
    const action = {
      type: 'SEND_SMS_NOTIFICATION_SUCCESSFUL', payload: 'message sent'
    };
    const expected = { responseMsg: 'message sent', loading: false, error: false };
    const newState = UserReducers.sendSmsForNotification(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SEND_SMS_NOTIFICATION_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'SEND_SMS_NOTIFICATION_UNSUCCESSFUL', payload: 'message could not be sent'
    };
    const expected = { responseMsg: 'message could not be sent', loading: false, error: false };
    const newState = UserReducers.sendSmsForNotification(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SEND_SMS_NOTIFICATION_REJECTED is passed', () => {
    const action = {
      type: 'SEND_SMS_NOTIFICATION_REJECTED'
    };
    const expected = { responseMsg: '', loading: false, error: true };
    const newState = UserReducers.sendSmsForNotification(passwordResetInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTER_GOOGLE_USER_BEGINS is passed', () => {
    const action = {
      type: 'REGISTER_GOOGLE_USER_BEGINS'
    };
    const expected = { response: [], loading: true, error: false };
    const newState = UserReducers.registerUserFromGoogle(googleUserInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTER_GOOGLE_USER_SUCCESSFUL is passed', () => {
    const action = {
      type: 'REGISTER_GOOGLE_USER_SUCCESSFUL', payload: { message: 'Successfully registered' }
    };
    const expected = { response: { message: 'Successfully registered' }, loading: false, error: false };
    const newState = UserReducers.registerUserFromGoogle(googleUserInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTER_GOOGLE_USER_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'REGISTER_GOOGLE_USER_UNSUCCESSFUL', payload: 'Unsuccessful registration'
    };
    const expected = { response: 'Unsuccessful registration', loading: false, error: false };
    const newState = UserReducers.registerUserFromGoogle(googleUserInitialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTER_GOOGLE_USER_REJECTED is passed', () => {
    const action = {
      type: 'REGISTER_GOOGLE_USER_REJECTED'
    };
    const expected = { response: [], loading: false, error: true };
    const newState = UserReducers.registerUserFromGoogle(googleUserInitialState, action);
    expect(newState).toEqual(expected);
  });

  it('should update the state when GET_READ_USERS_BEGINS is passed', () => {
    const action = {
      type: 'GET_READ_USERS_BEGINS'
    };
    const expected = { users: [], loading: true, error: false };
    const newState = UserReducers.readMessages(readMessagesInitial, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_READ_USERS_SUCCESSFUL is passed', () => {
    const action = {
      type: 'GET_READ_USERS_SUCCESSFUL', payload: [{ id: 1, username: 'noordean' }]
    };
    const expected = { users: [{ id: 1, username: 'noordean' }], loading: false, error: false };
    const newState = UserReducers.readMessages(readMessagesInitial, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_READ_USERS_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'GET_READ_USERS_UNSUCCESSFUL'
    };
    const expected = { users: [], loading: false, error: true };
    const newState = UserReducers.readMessages(readMessagesInitial, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_READ_USERS_REJECTED is passed', () => {
    const action = {
      type: 'GET_READ_USERS_REJECTED'
    };
    const expected = { users: [], loading: false, error: true };
    const newState = UserReducers.readMessages(readMessagesInitial, action);
    expect(newState).toEqual(expected);
  });

  it('should update the state when SAVE_NOTIFICATION_SUCCESSFUL is passed', () => {
    const action = {
      type: 'SAVE_NOTIFICATION_SUCCESSFUL', payload: 'notifications saved'
    };
    const expected = { notification: [], loading: false, error: false, responseMsg: 'notifications saved' };
    const newState = UserReducers.appNotification(notificationInitial, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SAVE_NOTIFICATION_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'SAVE_NOTIFICATION_SUCCESSFUL', payload: 'notifications could not be saved'
    };
    const expected = { notification: [], loading: false, error: false, responseMsg: 'notifications could not be saved' };
    const newState = UserReducers.appNotification(notificationInitial, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when SAVE_NOTIFICATION_REJECTED is passed', () => {
    const action = {
      type: 'SAVE_NOTIFICATION_REJECTED'
    };
    const expected = { notification: [], loading: false, error: true, responseMsg: '' };
    const newState = UserReducers.appNotification(notificationInitial, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_NOTIFICATION_SUCCESSFUL is passed', () => {
    const action = {
      type: 'GET_NOTIFICATION_SUCCESSFUL', payload: [{ id: 1, message: 'i am here', postedby: 'kola' }]
    };
    const expected = { notification: [{ id: 1, message: 'i am here', postedby: 'kola' }], loading: false, error: false, responseMsg: '' };
    const newState = UserReducers.appNotification(notificationInitial, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when DELETE_NOTIFICATION_SUCCESSFUL is passed', () => {
    const action = {
      type: 'DELETE_NOTIFICATION_SUCCESSFUL', payload: 'notification deleted'
    };
    const expected = { notification: [], loading: false, error: false, responseMsg: 'notification deleted' };
    const newState = UserReducers.appNotification(notificationInitial, action);
    expect(newState).toEqual(expected);
  });
});
