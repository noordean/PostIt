import axios from 'axios';

export const getGroups = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_GROUPS_BEGINS' });
    axios.get('https://postit-api.herokuapp.com/api/groups/' + JSON.parse(localStorage.user).user)
      .then((response) => {
        dispatch({ type: 'GOT_GROUPS', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_GROUPS_REJECTED', payload: err });
      });
  };
};