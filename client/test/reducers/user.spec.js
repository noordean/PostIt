import UserReducers from '../../reducers/user';

const initialStateRegLog = {
  regStatus: {},
  regProcessing: false,
  regProcessed: false,
  regError: null,
  loginStatus: {},
  loginProcessing: false,
  loginProcessed: false,
  loginError: null
};
const initialState = {
  reqStatus: {},
  reqProcessing: false,
  reqProcessed: false,
  reqError: null
};

describe('User Reducer', () => {
  it('should update the state when REGISTRATION_SUCCESSFUL is passed', () => {
    const action = {
      type: 'REGISTRATION_SUCCESSFUL', payload: { message: 'Registration successful' }
    };
    const expected = {
      regStatus: { message: 'Registration successful' },
      regProcessing: false,
      regProcessed: true,
      regError: null,
      loginStatus: {},
      loginProcessing: false,
      loginProcessed: false,
      loginError: null
    };
    const newState = UserReducers.registerAndLogin(initialStateRegLog, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTRATION_BEGINS is passed', () => {
    const action = {
      type: 'REGISTRATION_BEGINS'
    };
    const expected = {
      regStatus: {},
      regProcessing: true,
      regProcessed: false,
      regError: null,
      loginStatus: {},
      loginProcessing: false,
      loginProcessed: false,
      loginError: null
    };
    const newState = UserReducers.registerAndLogin(initialStateRegLog, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when REGISTRATION_REJECTED is passed', () => {
    const action = {
      type: 'REGISTRATION_REJECTED', payload: new Error()
    };
    const expected = {
      regStatus: {},
      regProcessing: false,
      regProcessed: false,
      regError: new Error(),
      loginStatus: {},
      loginProcessing: false,
      loginProcessed: false,
      loginError: null
    };
    const newState = UserReducers.registerAndLogin(initialStateRegLog, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when LOGIN_SUCCESSFUL is passed', () => {
    const action = {
      type: 'LOGIN_SUCCESSFUL', payload: { message: 'You are now logged in' }
    };
    const expected = {
      regStatus: {},
      regProcessing: false,
      regProcessed: false,
      regError: null,
      loginStatus: { message: 'You are now logged in' },
      loginProcessing: false,
      loginProcessed: true,
      loginError: null
    };
    const newState = UserReducers.registerAndLogin(initialStateRegLog, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when LOGIN_BEGINS is passed', () => {
    const action = {
      type: 'LOGIN_BEGINS'
    };
    const expected = {
      regStatus: {},
      regProcessing: false,
      regProcessed: false,
      regError: null,
      loginStatus: {},
      loginProcessing: true,
      loginProcessed: false,
      loginError: null
    };
    const newState = UserReducers.registerAndLogin(initialStateRegLog, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when LOGIN_REJECTED is passed', () => {
    const action = {
      type: 'LOGIN_REJECTED', payload: new Error()
    };
    const expected = {
      regStatus: {},
      regProcessing: false,
      regProcessed: false,
      regError: null,
      loginStatus: {},
      loginProcessing: false,
      loginProcessed: false,
      loginError: new Error()
    };
    const newState = UserReducers.registerAndLogin(initialStateRegLog, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when MEMBERS_ADDED is passed', () => {
    const action = {
      type: 'MEMBERS_ADDED', payload: { message: 'Users successfully added' }
    };
    const expected = {
      reqStatus: { message: 'Users successfully added' },
      reqProcessing: false,
      reqProcessed: true,
      reqError: null
    };
    const newState = UserReducers.addMembers(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when ADD_MEMBERS_BEGINS is passed', () => {
    const action = {
      type: 'ADD_MEMBERS_BEGINS'
    };
    const expected = {
      reqStatus: {},
      reqProcessing: true,
      reqProcessed: false,
      reqError: null
    };
    const newState = UserReducers.addMembers(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when ADD_MEMBERS_REJECTED is passed', () => {
    const action = {
      type: 'ADD_MEMBERS_REJECTED', payload: new Error()
    };
    const expected = {
      reqStatus: {},
      reqProcessing: false,
      reqProcessed: false,
      reqError: new Error()
    };
    const newState = UserReducers.addMembers(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GOT_MEMBERS is passed', () => {
    const action = {
      type: 'GOT_MEMBERS', payload: { message: 'Members gotten' }
    };
    const expected = {
      reqStatus: { message: 'Members gotten' },
      reqProcessing: false,
      reqProcessed: true,
      reqError: null
    };
    const newState = UserReducers.getGroupMembers(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MEMBERS_BEGINS is passed', () => {
    const action = {
      type: 'GET_MEMBERS_BEGINS'
    };
    const expected = {
      reqStatus: {},
      reqProcessing: true,
      reqProcessed: false,
      reqError: null
    };
    const newState = UserReducers.getGroupMembers(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MEMBERS_REJECTED is passed', () => {
    const action = {
      type: 'GET_MEMBERS_REJECTED', payload: new Error()
    };
    const expected = {
      reqStatus: {},
      reqProcessing: false,
      reqProcessed: false,
      reqError: new Error()
    };
    const newState = UserReducers.getGroupMembers(initialState, action);
    expect(newState).toEqual(expected);
  });
});
