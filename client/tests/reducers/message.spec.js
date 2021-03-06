import expect from 'expect';

import MessageReducers from '../../reducers/MessageReducers';

const initialState = {
  loading: false,
  responseMsg: '',
  messages: [],
  error: false
};

describe('Message Reducer', () => {
  it('should update the state when POST_MESSAGE_BEGINS is passed', () => {
    const action = {
      type: 'POST_MESSAGE_BEGINS'
    };
    const expected = {
      loading: true,
      responseMsg: '',
      messages: [],
      error: false
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when POST_MESSAGE_SUCCESSFUL is passed', () => {
    const action = {
      type: 'POST_MESSAGE_SUCCESSFUL',
      payload: { id: 1, postedby: 'noordean', priority: 'Critical' }
    };
    const expected = {
      loading: false,
      responseMsg: '',
      messages: [{ id: 1, postedby: 'noordean', priority: 'Critical' }],
      error: false
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when POST_MESSAGE_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'POST_MESSAGE_UNSUCCESSFUL', payload: 'Could not post message'
    };
    const expected = {
      loading: false,
      responseMsg: 'Could not post message',
      messages: [],
      error: false
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when POST_MESSAGE_REJECTED is passed', () => {
    const action = {
      type: 'POST_MESSAGE_REJECTED', payload: 'internal server error'
    };
    const expected = {
      loading: false,
      responseMsg: 'internal server error',
      messages: [],
      error: true
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MESSAGES_BEGINS is passed', () => {
    const action = {
      type: 'GET_MESSAGES_BEGINS'
    };
    const expected = {
      loading: true,
      responseMsg: '',
      messages: [],
      error: false
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MESSAGES_SUCCESSFUL is passed', () => {
    const action = {
      type: 'GET_MESSAGES_SUCCESSFUL',
      payload: [{ id: 1, postedby: 'noordean', priority: 'Critical' }]
    };
    const expected = {
      loading: false,
      responseMsg: '',
      messages: [{ id: 1, postedby: 'noordean', priority: 'Critical' }],
      error: false
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MESSAGES_UNSUCCESSFUL is passed', () => {
    const action = {
      type: 'GET_MESSAGES_UNSUCCESSFUL', payload: 'Could not get messages'
    };
    const expected = {
      loading: false,
      responseMsg: 'Could not get messages',
      messages: [],
      error: false
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when GET_MESSAGES_REJECTED is passed', () => {
    const action = {
      type: 'GET_MESSAGES_REJECTED', payload: 'internal server error'
    };
    const expected = {
      loading: false,
      responseMsg: 'internal server error',
      messages: [],
      error: true
    };
    const newState = MessageReducers.messageReducer(initialState, action);
    expect(newState).toEqual(expected);
  });

  it('should update the state when ARCHIVE_MESSAGES_BEGINS is passed', () => {
    const action = {
      type: 'ARCHIVE_MESSAGES_BEGINS'
    };
    const expected = {
      loading: true,
      responseMsg: '',
      messages: [],
      error: false
    };
    const newState = MessageReducers.archiveMessageReducer(initialState,
      action);
    expect(newState).toEqual(expected);
  });
  it('should update the state when ARCHIVE_MESSAGES_SUCCESSFUL is passed',
    () => {
      const action = {
        type: 'ARCHIVE_MESSAGES_SUCCESSFUL', message: 'Read messages archived'
      };
      const expected = {
        loading: false,
        responseMsg: 'Read messages archived',
        messages: [],
        error: false
      };
      const newState = MessageReducers.archiveMessageReducer(initialState,
        action);
      expect(newState).toEqual(expected);
    });
  it('should update the state when ARCHIVE_MESSAGES_UNSUCCESSFUL is passed',
    () => {
      const action = {
        type: 'ARCHIVE_MESSAGES_UNSUCCESSFUL',
        message: 'Read messages could not be archived'
      };
      const expected = {
        loading: false,
        responseMsg: 'Read messages could not be archived',
        messages: [],
        error: false
      };
      const newState = MessageReducers.archiveMessageReducer(initialState,
        action);
      expect(newState).toEqual(expected);
    });
  it('should update the state when ARCHIVE_MESSAGES_FAILED_UNEXPECTEDLY is passed', () => {
    const action = {
      type: 'ARCHIVE_MESSAGES_FAILED_UNEXPECTEDLY',
      message: 'internal server error'
    };
    const expected = {
      loading: false,
      responseMsg: 'internal server error',
      messages: [],
      error: true
    };
    const newState = MessageReducers.archiveMessageReducer(initialState,
      action);
    expect(newState).toEqual(expected);
  });

  it('should update the state when GET_ARCHIVE_MESSAGES_BEGINS is passed',
    () => {
      const action = {
        type: 'GET_ARCHIVE_MESSAGES_BEGINS'
      };
      const expected = {
        loading: true,
        responseMsg: '',
        messages: [],
        error: false
      };
      const newState = MessageReducers.archiveMessageReducer(initialState,
        action);
      expect(newState).toEqual(expected);
    });
  it('should update the state when GET_ARCHIVE_MESSAGES_SUCCESSFUL is passed',
    () => {
      const action = {
        type: 'GET_ARCHIVE_MESSAGES_SUCCESSFUL',
        payload: [{ message: 'message archived', postedby: 'kola' }]
      };
      const expected = {
        loading: false,
        responseMsg: '',
        messages: [{ message: 'message archived', postedby: 'kola' }],
        error: false
      };
      const newState = MessageReducers.archiveMessageReducer(initialState,
        action);
      expect(newState).toEqual(expected);
    });
  it('should update the state when GET_ARCHIVE_MESSAGES_UNSUCCESSFUL is passed',
    () => {
      const action = {
        type: 'GET_ARCHIVE_MESSAGES_UNSUCCESSFUL',
        payload: 'could not get archived messages'
      };
      const expected = {
        loading: false,
        responseMsg: 'could not get archived messages',
        messages: [],
        error: false
      };
      const newState = MessageReducers.archiveMessageReducer(initialState,
        action);
      expect(newState).toEqual(expected);
    });
  it('should update the state when GET_ARCHIVE_MESSAGES_REJECTED is passed', 
    () => {
      const action = {
        type: 'GET_ARCHIVE_MESSAGES_REJECTED', payload: 'internal server error'
      };
      const expected = {
        loading: false,
        responseMsg: 'internal server error',
        messages: [],
        error: true
      };
      const newState = MessageReducers.archiveMessageReducer(initialState,
        action);
      expect(newState).toEqual(expected);
    });
});
