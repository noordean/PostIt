import axios from 'axios';

/**
 * @class UserActions
 */
export default class UserActions {
  /**
  * Request to the API to register a user
  *
  * @static
  * @param {String} username The username of the user
  * @param {String} email The email of the user
  * @param {String} password The password of the user
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static registerUser(username, email, password) {
    return (dispatch) => {
      dispatch({ type: 'REGISTRATION_BEGINS' });
      return axios.post('https://postit-api.herokuapp.com/api/user/signup', {
        username,
        email,
        password
      })
        .then((response) => {
          dispatch({ type: 'REGISTRATION_SUCCESSFUL', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'REGISTRATION_REJECTED', payload: err });
        });
    };
  }

  /**
  * Request to the API to log a user in
  *
  * @static
  * @param {String} username The username of the user
  * @param {String} password The password of the user
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static loginUser(username, password) {
    return (dispatch) => {
      dispatch({ type: 'LOGIN_BEGINS' });
      return axios.post('https://postit-api.herokuapp.com/api/user/signin', {
        username,
        password
      })
        .then((response) => {
          if (response.data.message === 'You are now logged in') {
            return dispatch({ type: 'LOGIN_SUCCESSFUL', payload: response.data });
          }
          return dispatch({ type: 'LOGIN_UNSUCCESSFUL', payload: response.data });
        })
        .catch((err) => {
          return dispatch({ type: 'LOGIN_REJECTED', payload: err });
        });
    };
  }

  /**
  * Request to the API to get members(users) of a group
  *
  * @static
  * @param {Integer} groupID The id of the group to get members for
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static getGroupMembers(groupID) {
    return (dispatch) => {
      dispatch({ type: 'GET_MEMBERS_BEGINS' });
      return axios.get(`https://postit-api.herokuapp.com/api/group/${groupID}/members`)
        .then((response) => {
          dispatch({ type: 'GOT_MEMBERS', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'GET_MEMBERS_REJECTED', payload: err });
        });
    };
  }

  /**
  * Request to the API to add members(users) to a group
  *
  * @static
  * @param {Integer} groupID The id of the group to add members to
  * @param {String} usernames The usernames of the members to add
  * @param {String} token The JWToken to access the endpoint
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static addGroupMembers(groupID, usernames, token) {
    return (dispatch) => {
      dispatch({ type: 'ADD_MEMBERS_BEGINS' });
      return axios.post(`https://postit-api.herokuapp.com/api/group/${groupID}/user`, {
        groupID,
        usernames,
        token
      })
        .then((response) => {
          dispatch({ type: 'MEMBERS_ADDED', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'ADD_MEMBERS_REJECTED', payload: err });
        });
    };
  }
}

