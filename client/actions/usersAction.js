import axios from "axios";

export default function registerUser(username, email, password){
  return function(dispatch) {
    dispatch({type:'REGISTRATION_BEGINS'});
    axios.post('https://postit-api.herokuapp.com/api/user/signup', {
      username,
      email,
      password
    })
    .then((response) =>{
      console.log(response.data);
      dispatch({type:'REGISTRATION_SUCCESSFUL', payload: response.data});
    })
    .catch((err) => {
      dispatch({type:'REGISTRATION_REJECTED', payload:err})
    })
  }
}