const initialState = {
  reqStatus: {},
  reqError: false,
  loading: false
};

/**
 * @class UserReducers
 */
export default class UserReducers {
  /**
  * Reducer for registering users
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static register(state = initialState, action) {
    switch (action.type) {
      case 'REGISTRATION_BEGINS':
        return { ...state, loading: true };
      case 'REGISTRATION_SUCCESSFUL':
      case 'REGISTRATION_UNSUCCESSFUL':
        return { ...state, reqStatus: action.payload };
      case 'REGISTRATION_REJECTED':
        return { ...state, reqError: true, reqStatus: action.payload };
      default:
        return state;
    }
  }

  /**
  * Reducer for login users
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static login(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_BEGINS':
        return { ...state, loading: true };
      case 'LOGIN_SUCCESSFUL':
      case 'LOGIN_UNSUCCESSFUL':
        return { ...state, reqStatus: action.payload };
      case 'LOGIN_REJECTED':
        return { ...state, reqError: true, reqStatus: action.payload };
      default:
        return state;
    }
  }
  /**
  * Reducer for adding members to a group
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static groupMembers(state = {
    members: [], responseMsg: '', reqError: false }, action) {
    switch (action.type) {
      case 'GOT_MEMBERS':
        return { ...state, members: action.payload, responseMsg: '' };
      case 'MEMBERS_ADDED':
        const newState = { ...state, responseMsg: '' };
        newState.groups = [...newState.members, action.payload];
        return newState;
      case 'ADD_MEMBERS_FAILED':
      case 'GET_MEMBERS_FAILED':
        return { ...state, responseMsg: action.payload };
      case 'ADD_MEMBERS_REJECTED':
      case 'GET_MEMBERS_REJECTED':
        return { ...state, reqError: true, responseMsg: action.payload };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending mail for password reset
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static mailPassword(state = {
    responseMsg: '', loading: false, error: false, success: false }, action) {
    switch (action.type) {
      case 'RESET_PASSWORD_BEGINS':
        return { ...state, responseMsg: '', loading: true, success: false };
      case 'RESET_PASSWORD_SUCCESSFUL':
        return { ...state,
          responseMsg: action.payload,
          loading: false,
          success: true };
      case 'RESET_PASSWORD_UNSUCCESSFUL':
        return { ...state,
          responseMsg: action.payload,
          loading: false,
          success: false };
      case 'RESET_PASSWORD_REJECTED':
        return { ...state,
          responseMsg: action.payload,
          error: true,
          success: false };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending mail for password reset
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static verifyPassword(state = {
    responseMsg: '', loading: false, error: false }, action) {
    switch (action.type) {
      case 'VERIFY_PASSWORD_BEGINS':
        return { ...state, responseMsg: '', loading: true };
      case 'VERIFY_PASSWORD_SUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'VERIFY_PASSWORD_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'VERIFY_PASSWORD_REJECTED':
        return { ...state, responseMsg: action.payload, error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for regsitering users that sign in with google
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static registerGoogleUser(state = {
    response: [], loading: false, error: false }, action) {
    switch (action.type) {
      case 'REGISTER_GOOGLE_USER_BEGINS':
        return { ...state, loading: true };
      case 'REGISTER_GOOGLE_USER_SUCCESSFUL':
        return { ...state, response: action.payload, loading: false };
      case 'REGISTER_GOOGLE_USER_UNSUCCESSFUL':
        return { ...state, response: action.payload, loading: false };
      case 'REGISTER_GOOGLE_USER_REJECTED':
        return { ...state, error: true, response: action.payload };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending mail for notification
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static mailNotification(state = {
    responseMsg: '', loading: false, error: false }, action) {
    switch (action.type) {
      case 'SEND_EMAIL_NOTIFICATION_BEGINS':
        return { ...state, responseMsg: '', loading: true };
      case 'SEND_EMAIL_NOTIFICATION_SUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'SEND_EMAIL_NOTIFICATION_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'SEND_EMAIL_NOTIFICATION_REJECTED':
        return { ...state, responseMsg: action.payload, error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending sms for notification
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static smsNotification(state = {
    responseMsg: '', loading: false, error: false }, action) {
    switch (action.type) {
      case 'SEND_SMS_NOTIFICATION_BEGINS':
        return { ...state, responseMsg: '', loading: true };
      case 'SEND_SMS_NOTIFICATION_SUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'SEND_SMS_NOTIFICATION_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'SEND_SMS_NOTIFICATION_REJECTED':
        return { ...state, responseMsg: action.payload, error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for read messages
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static readMessages(state = {
    users: [], loading: false, error: false }, action) {
    switch (action.type) {
      case 'GET_READ_USERS_BEGINS':
        return { ...state, loading: true };
      case 'GET_READ_USERS_SUCCESSFUL':
        return { ...state, users: action.payload, loading: false };
      case 'GET_READ_USERS_UNSUCCESSFUL':
        return { ...state, loading: false, error: true };
      case 'GET_READ_USERS_REJECTED':
        return { ...state, error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for saving app notification
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static appNotification(state = {
    notification: [], loading: false, error: false, responseMsg: '' }, action) {
    switch (action.type) {
      case 'SAVE_NOTIFICATION_SUCCESSFUL':
      case 'SAVE_NOTIFICATION_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload };
      case 'GET_NOTIFICATION_SUCCESSFUL':
        return { ...state, notification: action.payload };
      case 'DELETE_NOTIFICATION_SUCCESSFUL':
        return { ...state, responseMsg: action.payload };
      case 'SAVE_NOTIFICATION_REJECTED':
      case 'GET_NOTIFICATION_REJECTED':
      case 'DELETE_NOTIFICATION_UNSUCCESSFUL':
      case 'DELETE_NOTIFICATION_REJECTED':
        return { ...state, error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending sms for notification
  *
  * @static
  *
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  *
  * @returns {Object} current state
  *
  * @memberof UserReducers
  */
  static searchedUsers(state = {
    users: [], error: false }, action) {
    switch (action.type) {
      case 'GET_SEARCHED_USERS_SUCCESSFUL':
        return { ...state, users: action.payload };
      case 'GET_SEARCHED_USERS_UNSUCCESSFUL':
      case 'GET_SEARCHED_USERS_REJECTED':
        return { ...state, error: true, users: [] };
      default:
        return state;
    }
  }
}
