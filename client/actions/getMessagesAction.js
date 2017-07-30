import axios from 'axios';

export const getMessages = (groupID, token) => {
  return (dispatch) => {
    dispatch({ type: 'GET_MESSAGES_BEGINS' });
    axios.get('https://postit-api.herokuapp.com/api/group/' + groupID + '/messages', {
      headers: {
        token
      }
    })
      .then((response) => {
        dispatch({ type: 'GOT_MESSAGES', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_MESSAGES_REJECTED', payload: err });
      });
  };
};