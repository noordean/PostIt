import axios from "axios";

export default function fetchUsers(){
  return function(dispatch) {
    axios.get('https://postit-api.herokuapp.com/api/group/1/messages')
        .then((response) =>{
         // console.log(response.data);
          dispatch({type:'FETCH_USERS_FULFILLED', payload: response.data});
        })
        .catch((err) => {
          dispatch({type:'FETCH_USERS_REJECTED', payload:err})
        })
  }
}