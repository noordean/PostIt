import axios from 'axios';

export const addGroupMembers = (groupID, usernames, token) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_MEMBERS_BEGINS' });
    axios.post('https://postit-api.herokuapp.com/api/group/' + groupID + '/user', {
      groupID,
      usernames,
      token
    })
      .then((response) => {
        dispatch({ type: 'MEMBERS_ADDED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_MEMBERS_REJECTED', payload: err });
      });
  };
};