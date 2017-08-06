const initialState = {
  reqStatus: {},
  reqProcessing: false,
  reqProcessed: false,
  reqError: null
};

/**
 * @class GroupReducers
 */
export default class GroupReducers {
  /**
  * Reducer for creating group
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof GroupReducers
  */
  static createGroup(state = {
    groupStatus: {},
    groupProcessing: false,
    groupProcessed: false,
    groupError: null
  }, action) {
    switch (action.type) {
      case 'CREATE_GROUP_BEGINS':
        return Object.assign({}, state, { groupProcessing: true });
      case 'GROUP_CREATED':
        return Object.assign({}, state, { groupStatus: action.payload, groupProcessed: true });
      case 'CREATE_GROUP_REJECTED':
        return Object.assign({}, state, { groupError: action.payload });
      default:
        return state;
    }
  }

  /**
  * Reducer for getting groups for a user
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof GroupReducers
  */
  static getGroups(state = initialState, action) {
    switch (action.type) {
      case 'GET_GROUPS_BEGINS':
        return Object.assign({}, state, { reqProcessing: true });
      case 'GOT_GROUPS':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'GET_GROUPS_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }

  /**
  * Reducer for getting total number of groups for a user
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof GroupReducers
  */
  static getTotalGroups(state = initialState, action) {
    switch (action.type) {
      case 'GET_ALL_GROUPS_BEGINS':
        return Object.assign({}, state, { reqProcessing: true });
      case 'GOT_ALL_GROUPS':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'GET_ALL_GROUPS_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }
}
