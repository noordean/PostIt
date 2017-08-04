import axios from 'axios';

export const getTotalMessages = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_ALL_MESSAGES_BEGINS' });
    axios.get('https://postit-api.herokuapp.com/api/groups/' + localStorage.groupID + '/messages')
      .then((response) => {
        dispatch({ type: 'GOT_ALL_MESSAGES', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_ALL_MESSAGES_REJECTED', payload: err });
      });
  };
};