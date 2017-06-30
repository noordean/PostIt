export default (state = {
  regStatus: {},
  inserting: false,
  inserted: false,
  error: null
}, action) => {
  switch (action.type) {
    case 'REGISTRATION_BEGINS':
      return Object.assign({}, state, {inserting: true});
    case 'REGISTRATION_SUCCESSFUL':
      return Object.assign({}, state, {regStatus: action.payload, inserted: true});
    case 'REGISTRATION_REJECTED':
      return Object.assign({}, state, {error: action.payload});
    default:
      return state;
  }
}
