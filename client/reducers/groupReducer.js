export default (state = {
  groupStatus: {},
  groupProcessing: false,
  groupProcessed: false,
  groupError: null
}, action) => {
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
};
