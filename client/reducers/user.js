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
        return Object.assign({}, state, { reqProcessing: true });
      case 'REGISTRATION_SUCCESSFUL':
      case 'REGISTRATION_UNSUCCESSFUL':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'REGISTRATION_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
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
        return Object.assign({}, state, { reqProcessing: true });
      case 'LOGIN_SUCCESSFUL':
      case 'LOGIN_UNSUCCESSFUL':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'LOGIN_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
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
      case 'ADD_MEMBERS_FAILED':
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
      case 'GET_MEMBERS_FAILED':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'GET_MEMBERS_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }
}
