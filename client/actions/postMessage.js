import axios from 'axios';

export const postGroupMessage = (groupID, message, token) => {
  return (dispatch) => {
    dispatch({ type: 'POST_MESSAGE_BEGINS' });
    axios.post('https://postit-api.herokuapp.com/api/group/' + groupID + '/message', {
      groupID,
      message,
      token
    })
      .then((response) => {
        dispatch({ type: 'MESSAGE_POSTED', payload: response.data });
        window.location.reload();
      })
      .catch((err) => {
        dispatch({ type: 'POST_MESSAGE_REJECTED', payload: err });
      });
  };
};