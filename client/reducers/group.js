const initialState = {
  groups: [],
  responseMsg: '',
  loading: false,
  error: false
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
      case 'CREATE_GROUP_BEGINS':
      case 'GET_GROUPS_BEGINS':
        return { ...state, loading: true };
      case 'GET_GROUPS_SUCCESSFUL':
        return { ...state, groups: action.groups, pageCount: action.pageCount, responseMsg: '', loading: false };
      case 'CREATE_GROUP_SUCCESSFUL':
        const newState = { ...state, responseMsg: '', loading: false };
        newState.groups = [...newState.groups, action.groups]
        return newState;
      case 'CREATE_GROUP_UNSUCCESSFUL':
      case 'GET_GROUPS_UNSUCCESSFUL':
        return { ...state, responseMsg: action.errorMessage, loading: false };
      case 'CREATE_GROUP_REJECTED':
      case 'GET_GROUPS_REJECTED':
        return { ...state, error: true, responseMsg: '', loading: false };
      default:
        return state;
    }
  }
}
