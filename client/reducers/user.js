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
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static register(state = initialState, action) {
    switch (action.type) {
      case 'REGISTRATION_BEGINS':
        return { ...state, reqStatus: action.payload, loading: true };
      case 'REGISTRATION_SUCCESSFUL':
      case 'REGISTRATION_UNSUCCESSFUL':
        return { ...state, reqStatus: action.payload };
      case 'REGISTRATION_REJECTED':
        return { ...state, reqError: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for login users
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static login(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_BEGINS':
        return { ...state, reqStatus: action.payload, loading: true };
      case 'LOGIN_SUCCESSFUL':
      case 'LOGIN_UNSUCCESSFUL':
        return { ...state, reqStatus: action.payload };
      case 'LOGIN_REJECTED':
        return { ...state, reqError: true };
      default:
        return state;
    }
  }
  /**
  * Reducer for adding members to a group
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static groupMembers(state = { members: [], responseMsg: '', reqError: false }, action) {
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
        return { ...state, reqError: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending mail for password reset
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static sendPasswordResetMail(state = { responseMsg: '', loading: false, error: false }, action) {
    switch (action.type) {
      case 'RESET_PASSWORD_BEGINS':
        return { ...state, responseMsg: '', loading: true };
      case 'RESET_PASSWORD_SUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'RESET_PASSWORD_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'RESET_PASSWORD_REJECTED':
        return { ...state, responseMsg: '', error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending mail for password reset
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static verifyPasswordReset(state = { responseMsg: '', loading: false, error: false }, action) {
    switch (action.type) {
      case 'VERIFY_PASSWORD_BEGINS':
        return { ...state, responseMsg: '', loading: true };
      case 'VERIFY_PASSWORD_SUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'VERIFY_PASSWORD_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'VERIFY_PASSWORD_REJECTED':
        return { ...state, responseMsg: '', error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for regsitering users that sign in with google
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static registerUserFromGoogle(state = { response: [], loading: false, error: false }, action) {
    switch (action.type) {
      case 'REGISTER_GOOGLE_USER_BEGINS':
        return { ...state, loading: true };
      case 'REGISTER_GOOGLE_USER_SUCCESSFUL':
        return { ...state, response: action.payload, loading: false };
      case 'REGISTER_GOOGLE_USER_UNSUCCESSFUL':
        return { ...state, response: action.payload, loading: false };
      case 'REGISTER_GOOGLE_USER_REJECTED':
        return { ...state, error: true };
      default:
        return state;
    }
  }

  /**
  * Reducer for sending mail for notification
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static sendMailForNotification(state = { responseMsg: '', loading: false, error: false }, action) {
    switch (action.type) {
      case 'SEND_EMAIL_NOTIFICATION_BEGINS':
        return { ...state, responseMsg: '', loading: true };
      case 'SEND_EMAIL_NOTIFICATION_SUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'SEND_EMAIL_NOTIFICATION_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'SEND_EMAIL_NOTIFICATION_REJECTED':
        return { ...state, responseMsg: '', error: true };
      default:
        return state;
    }
  }
}