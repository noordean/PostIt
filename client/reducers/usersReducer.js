
export default (state = {
  regStatus: {},
  regProcessiong: false,
  regProcessed: false,
  regError: null,
  loginStatus: {},
  loginProcessiong: false,
  loginProcessed: false,
  loginError: null,
}, action) => {
  switch (action.type) {
    case 'REGISTRATION_BEGINS':
      return Object.assign({}, state, { regProcessing: true });
    case 'REGISTRATION_SUCCESSFUL':
      return Object.assign({}, state, { regStatus: action.payload, regProcessed: true });
    case 'REGISTRATION_REJECTED':
      return Object.assign({}, state, { regError: action.payload });
    case 'LOGIN_BEGINS':
      return Object.assign({}, state, { loginProcessing: true });
    case 'LOGIN_SUCCESSFUL':
      return Object.assign({}, state, { loginStatus: action.payload, loginProcessed: true });
    case 'LOGIN_UNSUCCESSFUL':
      return Object.assign({}, state, { loginStatus: action.payload, loginProcessed: true });
    case 'LOGIN_REJECTED':
      return Object.assign({}, state, { loginError: action.payload });
    default:
      return state;
  }
};
