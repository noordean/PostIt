const initialState = {
  reqStatus: {},
  reqProcessing: false,
  reqProcessed: false,
  reqError: null
};

/**
 * @class UserReducers
 */
export default class UserReducers {
  /**
  * Reducer for registering and login users
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static registerAndLogin(state = {
    regStatus: {},
    regProcessing: false,
    regProcessed: false,
    regError: null,
    loginStatus: {},
    loginProcessing: false,
    loginProcessed: false,
    loginError: null,
  }, action) {
    switch (action.type) {
      case 'REGISTRATION_BEGINS':
        return Object.assign({}, state, { regProcessing: true });
      case 'REGISTRATION_SUCCESSFUL':
        return Object.assign({}, state, { regStatus: action.payload, regProcessed: true });
      case 'REGISTRATION_REJECTED':
        return Object.assign({}, state, { regError: action.payload });
      case 'LOGIN_BEGINS':
        return Object.assign({}, state, { loginProcessing: true });
      case 'LOGIN_SUCCESSFUL':
        return Object.assign({}, state, { loginStatus: action.payload, loginProcessed: true });
      case 'LOGIN_UNSUCCESSFUL':
        return Object.assign({}, state, { loginStatus: action.payload, loginProcessed: true });
      case 'LOGIN_REJECTED':
        return Object.assign({}, state, { loginError: action.payload });
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
  static addMembers(state = initialState, action) {
    switch (action.type) {
      case 'ADD_MEMBERS_BEGINS':
        return Object.assign({}, state, { reqProcessing: true });
      case 'MEMBERS_ADDED':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'ADD_MEMBERS_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }

  /**
  * Reducer for getting all members of a group
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof UserReducers
  */
  static getGroupMembers(state = initialState, action) {
    switch (action.type) {
      case 'GET_MEMBERS_BEGINS':
        return Object.assign({}, state, { reqProcessing: true });
      case 'GOT_MEMBERS':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'GET_MEMBERS_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }
}
