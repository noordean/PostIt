import axios from 'axios';

const controlToken = (token) => {
  if (token) {
    axios.defaults.headers.common.token = token;
  }
};

export default controlToken;
