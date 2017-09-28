import axios from 'axios';

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common.token = token;
  }
};

export default setToken;
