import axios from 'axios';

export const getGroupMembers = (groupID) => {
  return (dispatch) => {
    dispatch({ type: 'GET_MEMBERS_BEGINS' });
    axios.get('https://postit-api.herokuapp.com/api/group/' + groupID + '/members')
      .then((response) => {
        dispatch({ type: 'GOT_MEMBERS', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_MEMBERS_REJECTED', payload: err });
      });
  };
};