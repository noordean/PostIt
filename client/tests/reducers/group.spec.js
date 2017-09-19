import expect from 'expect';

import GroupReducers from '../../reducers/group';

const initialState = {
  groups: [],
  responseMsg: '',
  loading: false,
  error: false
};

describe('Group Reducer', () => {
  it('should update the state when CREATE_GROUP_BEGINS is passed', () => {
    const action = {
      type: 'CREATE_GROUP_BEGINS'
    };
    const expected = {
      groups: [],
      responseMsg: '',
      loading: true,
      error: false
    };
    const newState = GroupReducers.groupReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when CREATE_GROUP_SUCCESSFUL is passed', () => {
    const action = {
      type: 'CREATE_GROUP_SUCCESSFUL',
      groups: { id: 16, name: 'Andela-49', createdby: 'akinoau', description: 'for testing...' }
    };
    const expected = {
      groups: [{ id: 16, name: 'Andela-49', createdby: 'akinoau', description: 'for testing...' }],
      responseMsg: '',
      loading: false,
      error: false
    };
    const newState = GroupReducers.groupReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when CREATE_GROUP_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'CREATE_GROUP_UNSUCCESSFUL', errorMessage: 'Creating group unsuccessful'
    };
    const expected = {
      groups: [],
      responseMsg: 'Creating group unsuccessful',
      loading: false,
      error: false
    };
    const newState = GroupReducers.groupReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when CREATE_GROUP_REJECTED is passed', () => {
    const action = {
      type: 'CREATE_GROUP_REJECTED'
    };
    const expected = {
      groups: [],
      responseMsg: '',
      loading: false,
      error: true
    };
    const newState = GroupReducers.groupReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_GROUPS_BEGINS is passed', () => {
    const action = {
      type: 'GET_GROUPS_BEGINS'
    };
    const expected = {
      groups: [],
      responseMsg: '',
      loading: true,
      error: false
    };
    const newState = GroupReducers.groupReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_GROUPS_SUCCESSFUL is passed', () => {
    const action = {
      type: 'GET_GROUPS_SUCCESSFUL', groups: [{ id: 1, name: 'Andela-49', createdby: 'akinoau', description: 'for testing...' }], pageCount: 1
    };
    const expected = {
      groups: [{ id: 1, name: 'Andela-49', createdby: 'akinoau', description: 'for testing...' }],
      pageCount: 1,
      responseMsg: '',
      loading: false,
      error: false
    };
    const newState = GroupReducers.groupReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
});
