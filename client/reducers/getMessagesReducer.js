export default (state = {
  reqStatus: [],
  reqProcessing: false,
  reqProcessed: false,
  reqError: null
}, action) => {
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
};
