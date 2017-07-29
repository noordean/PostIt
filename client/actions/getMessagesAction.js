
export const getMessages = (groupID, token) => {
  return (dispatch) => {
    dispatch({ type: 'GET_MESSAGES_BEGINS' });
  fetch('https://postit-api.herokuapp.com/api/group/' + groupID +'/messages', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'token': token
      }
  }) 
    .then(function(res) {
        if (res.ok) {
            res.json().then((data) => {
                dispatch({ type: 'GOT_MESSAGES', payload: data });                
                console.log(data);
            })
        }
     })
     .catch((err) => {
        dispatch({ type: 'GET_MESSAGES_REJECTED', payload: err });
     })
  }
}