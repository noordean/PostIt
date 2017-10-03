import axios from 'axios';
import { browserHistory } from 'react-router';

/**
 * @description: secure token in the front-end
 * 
 * @class Auth
 */
export default class Auth {
/**
 * @description: sets token in axios headers
 * 
 * @param {String} token token to set
 * 
 * @return {Void} Void
 */
  static setToken(token) {
    if (token) {
      axios.defaults.headers.common.token = token;
    }
  }

  /**
 * @description: remove token from localStorage
 * 
 * @return {Void} Void
 */
  static removeToken() {
    localStorage.removeItem('user');
    browserHistory.push('/signin');
    window.location.reload();
  }
}
