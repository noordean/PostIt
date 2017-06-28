const userReducer = (state = {
  users: [],
  fetching: false,
  fetched: false,
  error: null
}, action) => {
  switch (action.type) {
    case 'FETCH_USERS_FULFILLED': {
      return Object.assign({}, state, {fetched: true, users: action.payload});
      break;
    }
    case 'FETCH_USERS_REJECTED': {
      return Object.assign({}, state, {error: action.payload});
      break;
    }
    default: {
      return state;
    }
  }
}

export default userReducer;