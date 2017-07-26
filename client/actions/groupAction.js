import axios from 'axios';

export const createGroup = (groupName, description, groupMembers, token) => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_GROUP_BEGINS' });
    axios.post('https://postit-api.herokuapp.com/api/group', {
      groupName,
      description,
      groupMembers
    })
      .then((response) => {
        dispatch({ type: 'GROUP_CREATED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_GROUP_REJECTED', payload: err });
      });
  };
};
