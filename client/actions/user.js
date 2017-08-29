import axios from 'axios';
import authorization from '../utils/authorization';
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
      return axios.post('/api/v1/user/signup', {
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
            dispatch({ type: 'REGISTRATION_REJECTED' });
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
      return axios.post('api/v1/user/signin', {
        username,
        password
      })
        .then((response) => {
          dispatch({ type: 'LOGIN_SUCCESSFUL', payload: response.data });
          authorization(response.data.user.token);
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'LOGIN_UNSUCCESSFUL', payload: err.response.data });
          } else {
            dispatch({ type: 'LOGIN_REJECTED' });
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
  static getGroupMembers(groupID) {
    return dispatch => axios.get(`/api/v1/group/${groupID}/users`)
      .then((response) => {
        dispatch({ type: 'GOT_MEMBERS', payload: response.data.users });
      })
      .catch((err) => {
        if (err.response.data.message) {
          dispatch({ type: 'GET_MEMBERS_FAILED', payload: err.response.data.message });
        } else {
          dispatch({ type: 'GET_MEMBERS_REJECTED' });
        }
      });
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
  static addGroupMembers(groupID, userId) {
    return dispatch => axios.post(`/api/v1/group/${groupID}/user`, {
      groupID,
      userId
    })
      .then((response) => {
        dispatch({ type: 'MEMBERS_ADDED', payload: response.data.message });
      })
      .catch((err) => {
        if (err.response.data.message) {
          dispatch({ type: 'ADD_MEMBERS_FAILED', payload: err.response.data.message });
        } else {
          dispatch({ type: 'ADD_MEMBERS_REJECTED' });
        }
      });
  }

  /**
  * Request to the API to send confirmation mail to reset password
  *
  * @static
  * @param {String} recepient The email of the user
  * @param {String} password The password of the user
  * @returns {Object} dispatched object
  * @memberof UserActions
  */
  static sendPasswordResetMail(recepient, password) {
    return (dispatch) => {
      dispatch({ type: 'RESET_PASSWORD_BEGINS' });
      return axios.post('/api/v1/user/email', {
        recepient,
        password
      })
        .then((response) => {
          dispatch({ type: 'RESET_PASSWORD_SUCCESSFUL', payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500 || err.response.status === 400
          || err.response.status === 404) {
            dispatch({ type: 'RESET_PASSWORD_UNSUCCESSFUL', payload: err.response.data.message });
          } else {
            dispatch({ type: 'RESET_PASSWORD_REJECTED' });
          }
        });
    };
  }

  /**
  * Request to the API to verify the url sent to user's email
  *
  * @static
  * @param {String} mailToken The token attached to the url
  * @returns {Object} dispatched object
  * @memberof UserActions
  */
  static verifyPasswordReset(mailToken) {
    return (dispatch) => {
      dispatch({ type: 'VERIFY_PASSWORD_BEGINS' });
      return axios.post('/api/v1/user/email/verify', {
        mailToken
      })
        .then((response) => {
          dispatch({ type: 'VERIFY_PASSWORD_SUCCESSFUL', payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch({ type: 'VERIFY_PASSWORD_UNSUCCESSFUL', payload: err.response.data.message });
          } else {
            dispatch({ type: 'VERIFY_PASSWORD_REJECTED' });
          }
        });
    };
  }

  /**
  * Request to the API to register user with google+
  *
  * @static
  * @param {String} username The username gotten from the user's credential
  * @param {String} email The email gotten from the user's credential
  * @returns {Object} dispatched object
  * @memberof UserActions
  */
  static registerUserFromGoogle(username, email) {
    return (dispatch) => {
      dispatch({ type: 'REGISTER_GOOGLE_USER_BEGINS' });
      return axios.post('/api/v1/user/signup/google', {
        username,
        email
      })
        .then((response) => {
          dispatch({ type: 'REGISTER_GOOGLE_USER_SUCCESSFUL', payload: response.data });
        })
        .catch((err) => {
          if (err.response.status === 409) {
            dispatch({ type: 'REGISTER_GOOGLE_USER_UNSUCCESSFUL', payload: err.response.data });
          } else {
            dispatch({ type: 'REGISTER_GOOGLE_USER_REJECTED' });
          }
        });
    };
  }

  /**
  * Request to the API to send mail for notification
  *
  * @static
  * @param {String} recepients The emails of the users to send to
  * @param {String} group The group name
  * @param {String} message The message posted 
  * @param {String} poster username of the poster  
  * @returns {string} dispatched object
  * @memberof UserActions
  */
  static sendMailForNotification(recepients, group, message, poster) {
    return (dispatch) => {
      dispatch({ type: 'SEND_EMAIL_NOTIFICATION_BEGINS' });
      return axios.post('/api/v1/users/email', {
        recepients,
        group,
        message,
        poster
      })
        .then((response) => {
          dispatch({ type: 'SEND_EMAIL_NOTIFICATION_SUCCESSFUL', payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500 || err.response.status === 400
          || err.response.status === 404) {
            dispatch({ type: 'SEND_EMAIL_NOTIFICATION_UNSUCCESSFUL', payload: err.response.data.message });
          } else {
            dispatch({ type: 'SEND_EMAIL_NOTIFICATION_REJECTED' });
          }
        });
    };
  }
}

