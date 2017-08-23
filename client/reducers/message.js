const initialState = {
  responseMsg: '',
  messages: [],
  reqError: false
};

/**
 * @class GroupReducers
 */
export default class MessageReducers {
  /**
  * Reducer for posting message into a group
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof MessageReducers
  */
  static messageReducer(state = initialState, action) {
    switch (action.type) {
      case 'GOT_ALL_MESSAGES':
        return { ...state, messages: action.payload, responseMsg: '' }
      case 'MESSAGE_POSTED':
        const newState = { ...state, responseMsg: '' };
        newState.messages = [...newState.messages, action.payload]
        return newState;
      case 'GET_ALL_MESSAGES_FAILED':
      case 'POST_MESSAGE_FAILED':
        return { ...state, responseMsg: action.payload }
      case 'POST_MESSAGE_REJECTED':
      case 'GET_ALL_MESSAGES_REJECTED':
        return { ...state, reqError: true }
      default:
        return state;
    }
  }
}
