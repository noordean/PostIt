const initialState = {
  loading: false,
  responseMsg: '',
  messages: [],
  error: false
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
      case 'GET_MESSAGES_BEGINS':
        return { ...state, loading: true };
      case 'GET_MESSAGES_SUCCESSFUL':
        return { ...state, messages: action.payload, responseMsg: '', loading: false };
      case 'POST_MESSAGE_SUCCESSFUL':
        const newState = { ...state, responseMsg: '' };
        console.log(action.payload);
        console.log('hereeee inside reducer')
        newState.messages = [...newState.messages, action.payload];
        return newState;
      case 'GET_MESSAGES_UNSUCCESSFUL':
      case 'POST_MESSAGE_UNSUCCESSFUL':
        return { ...state, responseMsg: action.payload, loading: false };
      case 'POST_MESSAGE_REJECTED':
      case 'GET_MESSAGES_REJECTED':
        return { ...state, error: true, loading: false, responseMsg: '' };
      default:
        return state;
    }
  }
}
