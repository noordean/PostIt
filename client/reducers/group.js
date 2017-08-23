const initialState = {
  groups: [],
  responseMsg: '',
  reqError: false
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
  static groupReducer(state = initialState, action) {
    switch (action.type) {
      case 'GOT_GROUPS':
        return { ...state, groups: action.payload, pageCount: action.pageCount, responseMsg: '' };
      case 'GROUP_CREATED':
        const newState = { ...state, responseMsg: '' };
        newState.groups = [...newState.groups, action.payload]
        return newState;
      case 'CREATE_GROUP_UNSUCCESSFUL':
      case 'GET_GROUPS_FAILED':
        return { ...state, responseMsg: action.payload }
      case 'CREATE_GROUP_REJECTED':
      case 'GET_GROUPS_REJECTED':
        return { ...state, reqError: true }
      default:
        return state;
    }
  }
}
