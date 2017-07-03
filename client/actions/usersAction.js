import axios from "axios";

export const registerUser = (username, email, password) => {
  return (dispatch) => {
    dispatch({ type:'REGISTRATION_BEGINS' });
    axios.post('https://postit-api.herokuapp.com/api/user/signup', {
      username,
      email,
      password
    })
    .then((response) =>{
      dispatch({ type:'REGISTRATION_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type:'REGISTRATION_REJECTED', payload:err })
    })
  }
}

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type:'LOGIN_BEGINS' });
    axios.post('https://postit-api.herokuapp.com/api/user/signin', {
      username,
      password
    })
    .then((response) => {
      dispatch({ type:'LOGIN_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type:'LOGIN_REJECTED', payload:err })
    })
  }
}