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
  * @param {String} phoneNumber The phone number of the user
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static registerUser(username, email, password, phoneNumber) {
    return (dispatch) => {
      dispatch({ type: 'REGISTRATION_BEGINS' });
      return axios.post('/api/user/signup', {
        username,
        email,
        password,
        phoneNumber
      })
        .then((response) => {
          dispatch({ type: 'REGISTRATION_SUCCESSFUL', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'REGISTRATION_UNSUCCESSFUL', payload: err.response.data });
          } else {
            dispatch({ type: 'REGISTRATION_REJECTED', payload: err });
          }
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
      return axios.post('api/user/signin', {
        username,
        password
      })
        .then((response) => {
          dispatch({ type: 'LOGIN_SUCCESSFUL', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'LOGIN_UNSUCCESSFUL', payload: err.response.data });
          } else {
            dispatch({ type: 'LOGIN_REJECTED', payload: err });
          }
        });
    };
  }

  /**
  * Request to the API to get members(users) of a group
  *
  * @static
  * @param {Integer} groupID The id of the group to get members for
  * @param {String} token the login token
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static getGroupMembers(groupID, token) {
    return (dispatch) => {
      dispatch({ type: 'GET_MEMBERS_BEGINS' });
      return axios.get(`/api/group/${groupID}/user`, {
        headers: {
          token
        }
      })
        .then((response) => {
          dispatch({ type: 'GOT_MEMBERS', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'GET_MEMBERS_FAILED', payload: err.response.data });
          } else {
            dispatch({ type: 'GET_MEMBERS_REJECTED', payload: err });
          }
        });
    };
  }

  /**
  * Request to the API to add members(users) to a group
  *
  * @static
  * @param {Integer} groupID The id of the group to add members to
  * @param {String} userId The id's of the users to add
  * @param {String} token The JWToken to access the endpoint
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static addGroupMembers(groupID, userId, token) {
    return (dispatch) => {
      dispatch({ type: 'ADD_MEMBERS_BEGINS' });
      return axios.post(`/api/group/${groupID}/user`, {
        groupID,
        userId,
        token
      })
        .then((response) => {
          dispatch({ type: 'MEMBERS_ADDED', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'ADD_MEMBERS_FAILED', payload: err.response.data });
          } else {
            dispatch({ type: 'ADD_MEMBERS_REJECTED', payload: err });
          }
        });
    };
  }
}

