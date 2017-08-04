import axios from 'axios';

export const getTotalGroups = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_ALL_GROUPS_BEGINS' });
    axios.get('https://postit-api.herokuapp.com/api/groups/' + JSON.parse(localStorage.user).user)
      .then((response) => {
        dispatch({ type: 'GOT_ALL_GROUPS', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_ALL_GROUPS_REJECTED', payload: err });
      });
  };
};