export default (state = {
  reqStatus: {},
  reqProcessing: false,
  reqProcessed: false,
  reqError: null
}, action) => {
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
};
