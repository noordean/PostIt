const initialState = {
  reqStatus: {},
  reqProcessing: false,
  reqProcessed: false,
  reqError: null
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
  static postMessage(state = initialState, action) {
    switch (action.type) {
      case 'POST_MESSAGE_BEGINS':
        return Object.assign({}, state, { reqProcessing: true });
      case 'MESSAGE_POSTED':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'POST_MESSAGE_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }

  /**
  * Reducer for getting messages of a particular group
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof MessageReducers
  */
  static getMessages(state = initialState, action) {
    switch (action.type) {
      case 'GET_MESSAGES_BEGINS':
        return Object.assign({}, state, { reqProcessing: true });
      case 'GOT_MESSAGES':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'GET_MESSAGES_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }

  /**
  * Reducer for getting total number of messages of a group
  *
  * @static
  * @param {Object} state The initial state
  * @param {Object} action The dispatched action
  * @returns {Object} current state
  * @memberof MessageReducers
  */
  static getTotalMessages(state = initialState, action) {
    switch (action.type) {
      case 'GET_ALL_MESSAGES_BEGINS':
        return Object.assign({}, state, { reqProcessing: true });
      case 'GOT_ALL_MESSAGES':
        return Object.assign({}, state, { reqStatus: action.payload, reqProcessed: true });
      case 'GET_ALL_MESSAGES_REJECTED':
        return Object.assign({}, state, { reqError: action.payload });
      default:
        return state;
    }
  }
}
